import cors from "cors";
import express from "express";
import { authMiddleware, handleLogin } from "./auth.js";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware as apolloMiddleware } from "@apollo/server/express4";
import { readFile } from "node:fs/promises";
import { ResolverContext, resolvers } from "./resolvers.js";
import { getUser } from "./db/users.js";
import { createCompanyLoader } from "./db/companies.js";

const PORT = 9000;

const app = express();
app.use(cors(), express.json(), authMiddleware);

app.post("/login", handleLogin);

const typeDefs = await readFile("./schema.graphql", "utf-8");

const getContext = async ({ req }): Promise<ResolverContext> => {
	const { auth } = req;
	const companyLoader = createCompanyLoader();
	const context: ResolverContext = { companyLoader };
	if (auth) {
		context.user = await getUser(auth.sub);
	}
	return context;
};

const apolloServer = new ApolloServer({ typeDefs, resolvers });
await apolloServer.start();
app.use("/graphql", apolloMiddleware(apolloServer, { context: getContext }));

app.listen({ port: PORT }, () => {
	console.log(`🚀 Server running on port ${PORT}`);
	console.log(`🚀 Graphql endpoint: http:.//localhost:${PORT}/graphql`);
});
