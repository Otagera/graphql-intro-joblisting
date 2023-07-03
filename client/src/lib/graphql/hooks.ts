import { useMutation, useQuery } from "@apollo/client";
import {
	jobsQuery,
	jobByIdQuery,
	companyByIdQuery,
	createJobMutation,
} from "./queries";

export const useCompany = (id: string) => {
	const { data, loading, error } = useQuery(companyByIdQuery, {
		variables: { id },
	});
	return { company: data?.company, loading, error: Boolean(error) };
};

export const useJob = (id: string) => {
	const { data, loading, error } = useQuery(jobByIdQuery, {
		variables: { id },
	});
	return { job: data?.job, loading, error: Boolean(error) };
};

export const useJobs = (limit: number = 10, offset: number = 0) => {
	const { data, loading, error } = useQuery(jobsQuery, {
		fetchPolicy: "network-only",
		variables: { limit, offset },
	});
	return {
		jobs: data?.jobs,
		loading,
		error: Boolean(error),
	};
};

export const useCreateJob = () => {
	const [mutate, { loading }] = useMutation(createJobMutation);
	const createJob = async (title: string, description?: string) => {
		const {
			data: { job },
		} = await mutate({
			variables: {
				input: { title, description },
			},
			update: (cache, { data }) => {
				cache.writeQuery({
					query: jobByIdQuery,
					variables: { id: data.job.id },
					data,
				});
			},
		});
		return job;
	};
	return { createJob, loading };
};
