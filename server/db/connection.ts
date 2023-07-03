import pkg from "knex";
const { knex } = pkg;

export const connection = knex({
	client: "better-sqlite3",
	connection: {
		filename: "./data/db.sqlite3",
	},
	useNullAsDefault: true,
});

connection.on("query", ({ sql, bindings }) => {
	const query = connection.raw(sql, bindings).toQuery();
	console.log("[db]", query);
});
