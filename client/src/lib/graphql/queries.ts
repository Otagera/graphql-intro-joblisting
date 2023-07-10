import {
	ApolloClient,
	ApolloLink,
	InMemoryCache,
	createHttpLink,
	concat,
} from "@apollo/client";
import { getAccessToken } from "../auth";
import { graphql } from "../../generated";

const httpLink = createHttpLink({ uri: "http://localhost:9000/graphql" });

const authLink = new ApolloLink((operation, forward) => {
	const accessToken = getAccessToken();
	if (accessToken) {
		operation.setContext({
			headers: { Authorization: `Bearer ${accessToken}` },
		});
	}
	return forward(operation);
});

export const apolloClient = new ApolloClient({
	link: concat(authLink, httpLink),
	cache: new InMemoryCache(),
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const jobDetailFragment = graphql(`
	fragment JobDetail on Job {
		id
		date
		title
		description
		company {
			id
			name
		}
	}
`);

export const jobByIdQuery = graphql(`
	query GetJob($id: ID!) {
		job(id: $id) {
			...JobDetail
		}
	}
`);

export const jobsQuery = graphql(`
	query Jobs($limit: Int, $offset: Int) {
		jobs(limit: $limit, offset: $offset) {
			items {
				...JobDetail
			}
			totalCount
		}
	}
`);

export const companyByIdQuery = graphql(`
	query CompanyById($id: ID!) {
		company(id: $id) {
			id
			name
			description
			jobs {
				id
				date
				title
				description
			}
		}
	}
`);

export const createJobMutation = graphql(`
	mutation CreateJob($input: CreateJobInput!) {
		job: createJob(input: $input) {
			...JobDetail
		}
	}
`);
