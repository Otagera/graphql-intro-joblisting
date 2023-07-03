import {
	ApolloClient,
	ApolloLink,
	InMemoryCache,
	createHttpLink,
	concat,
	gql,
} from "@apollo/client";
import { getAccessToken } from "../auth";

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

const jobDetailFragment = gql`
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
`;

export const jobByIdQuery = gql`
	query GetJob($id: ID!) {
		job(id: $id) {
			...JobDetail
		}
	}
	${jobDetailFragment}
`;

export const jobsQuery = gql`
	query Jobs($limit: Int, $offset: Int) {
		jobs(limit: $limit, offset: $offset) {
			items {
				...JobDetail
			}
			totalCount
		}
	}
	${jobDetailFragment}
`;

export const companyByIdQuery = gql`
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
`;

export const createJobMutation = gql`
	mutation CreateJob($input: CreateJobInput!) {
		job: createJob(input: $input) {
			...JobDetail
		}
	}
	${jobDetailFragment}
`;
