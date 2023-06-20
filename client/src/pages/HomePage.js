import JobList from "../components/JobList";
import { useJobs } from "../lib/graphql/hooks";

function HomePage() {
	const { jobs, loading, error } = useJobs();

	if (loading) {
		return (
			<div>
				<h1>Loading......</h1>
			</div>
		);
	}
	if (error) {
		return (
			<div>
				<h1 className="has-text-danger">Data Unavailable</h1>
			</div>
		);
	}
	return (
		<div>
			<h1 className="title">Job Board</h1>
			<JobList jobs={jobs} />
		</div>
	);
}

export default HomePage;
