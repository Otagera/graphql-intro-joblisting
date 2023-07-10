/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n\tfragment JobDetail on Job {\n\t\tid\n\t\tdate\n\t\ttitle\n\t\tdescription\n\t\tcompany {\n\t\t\tid\n\t\t\tname\n\t\t}\n\t}\n": types.JobDetailFragmentDoc,
    "\n\tquery GetJob($id: ID!) {\n\t\tjob(id: $id) {\n\t\t\t...JobDetail\n\t\t}\n\t}\n\t\n": types.GetJobDocument,
    "\n\tquery Jobs($limit: Int, $offset: Int) {\n\t\tjobs(limit: $limit, offset: $offset) {\n\t\t\titems {\n\t\t\t\t...JobDetail\n\t\t\t}\n\t\t\ttotalCount\n\t\t}\n\t}\n\t\n": types.JobsDocument,
    "\n\tquery CompanyById($id: ID!) {\n\t\tcompany(id: $id) {\n\t\t\tid\n\t\t\tname\n\t\t\tdescription\n\t\t\tjobs {\n\t\t\t\tid\n\t\t\t\tdate\n\t\t\t\ttitle\n\t\t\t\tdescription\n\t\t\t}\n\t\t}\n\t}\n": types.CompanyByIdDocument,
    "\n\tmutation CreateJob($input: CreateJobInput!) {\n\t\tjob: createJob(input: $input) {\n\t\t\t...JobDetail\n\t\t}\n\t}\n\t\n": types.CreateJobDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tfragment JobDetail on Job {\n\t\tid\n\t\tdate\n\t\ttitle\n\t\tdescription\n\t\tcompany {\n\t\t\tid\n\t\t\tname\n\t\t}\n\t}\n"): (typeof documents)["\n\tfragment JobDetail on Job {\n\t\tid\n\t\tdate\n\t\ttitle\n\t\tdescription\n\t\tcompany {\n\t\t\tid\n\t\t\tname\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery GetJob($id: ID!) {\n\t\tjob(id: $id) {\n\t\t\t...JobDetail\n\t\t}\n\t}\n\t\n"): (typeof documents)["\n\tquery GetJob($id: ID!) {\n\t\tjob(id: $id) {\n\t\t\t...JobDetail\n\t\t}\n\t}\n\t\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery Jobs($limit: Int, $offset: Int) {\n\t\tjobs(limit: $limit, offset: $offset) {\n\t\t\titems {\n\t\t\t\t...JobDetail\n\t\t\t}\n\t\t\ttotalCount\n\t\t}\n\t}\n\t\n"): (typeof documents)["\n\tquery Jobs($limit: Int, $offset: Int) {\n\t\tjobs(limit: $limit, offset: $offset) {\n\t\t\titems {\n\t\t\t\t...JobDetail\n\t\t\t}\n\t\t\ttotalCount\n\t\t}\n\t}\n\t\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery CompanyById($id: ID!) {\n\t\tcompany(id: $id) {\n\t\t\tid\n\t\t\tname\n\t\t\tdescription\n\t\t\tjobs {\n\t\t\t\tid\n\t\t\t\tdate\n\t\t\t\ttitle\n\t\t\t\tdescription\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery CompanyById($id: ID!) {\n\t\tcompany(id: $id) {\n\t\t\tid\n\t\t\tname\n\t\t\tdescription\n\t\t\tjobs {\n\t\t\t\tid\n\t\t\t\tdate\n\t\t\t\ttitle\n\t\t\t\tdescription\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tmutation CreateJob($input: CreateJobInput!) {\n\t\tjob: createJob(input: $input) {\n\t\t\t...JobDetail\n\t\t}\n\t}\n\t\n"): (typeof documents)["\n\tmutation CreateJob($input: CreateJobInput!) {\n\t\tjob: createJob(input: $input) {\n\t\t\t...JobDetail\n\t\t}\n\t}\n\t\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;