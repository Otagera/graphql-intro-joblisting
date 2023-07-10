import DataLoader from "dataloader";
import { GraphQLError } from "graphql";
import { getCompany } from "./db/companies.js";
import {
	countJobs,
	createJob,
	deleteJob,
	getJob,
	getJobs,
	getJobsByCompany,
	updateJob,
} from "./db/jobs.js";
import { Resolvers } from "./generated/graphql.js";
import { CompanyEntity, UserEntity } from "./db/types.js";

export interface ResolverContext {
	companyLoader: DataLoader<string, CompanyEntity, string>;
	user?: UserEntity;
}

export const resolvers: Resolvers = {
	Query: {
		company: async (_root, { id }) => {
			const company = await getCompany(id);
			if (!company) {
				throw notFoundError("No Company found with id " + id);
			}
			return company;
		},
		job: async (_root, { id }) => {
			const job = await getJob(id);
			if (!job) {
				throw notFoundError("No Job found with id " + id);
			}
			return job;
		},
		jobs: async (_root, { limit, offset }) => {
			const items = await getJobs(limit, offset);
			const totalCount = await countJobs();
			return { items, totalCount };
		},
	},

	Mutation: {
		createJob: async (_root, { input: { title, description } }, { user }) => {
			if (!user) {
				throw unauthorizedError("Missing Authentication");
			}
			return await createJob({ companyId: user.companyId, title, description });
		},
		updateJob: async (
			_root,
			{ input: { id, title, description } },
			{ user }
		) => {
			if (!user) {
				throw unauthorizedError("Missing Authentication");
			}
			const job = await updateJob({
				id,
				companyId: user.companyId,
				title,
				description,
			});
			if (!job) {
				throw notFoundError("No Job found with id " + id);
			}
			return job;
		},
		deleteJob: async (_root, { id }, { user }) => {
			if (!user) {
				throw unauthorizedError("Missing Authentication");
			}
			const job = await deleteJob(id, user.companyId);
			if (!job) {
				throw notFoundError("No Job found with id " + id);
			}
			return job;
		},
	},

	Company: {
		jobs: (company) => getJobsByCompany(company.id),
	},

	Job: {
		date: (job) => toISOString(job.createdAt),
		company: (job, _args, { companyLoader }) =>
			companyLoader.load(job.companyId),
	},
};

const notFoundError = (message: string) =>
	new GraphQLError(message, {
		extensions: { code: "NOT_FOUND" },
	});

const unauthorizedError = (message: string) =>
	new GraphQLError(message, {
		extensions: { code: "UNAUTHORIZED" },
	});

const toISOString = (value: string) => value.slice(0, "yyyy-mm-dd".length);
