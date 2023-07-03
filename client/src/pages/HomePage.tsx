import { useState } from "react";
import JobList from "../components/JobList";
import { useJobs } from "../lib/graphql/hooks";
import PaginationBar from "../components/PaginationBar";

const JOBS_PER_PAGE = 5;

function HomePage() {
	const [currentPage, setCurrentPage] = useState(1);
	const { jobs, loading, error } = useJobs(
		JOBS_PER_PAGE,
		(currentPage - 1) * JOBS_PER_PAGE
	);

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
	const totalPages = Math.ceil(jobs.totalCount / JOBS_PER_PAGE);
	return (
		<div>
			<h1 className="title">Job Board</h1>
			<div>
				<PaginationBar
					currentPage={currentPage}
					totalPages={totalPages}
					onPageChange={setCurrentPage}
				/>
			</div>
			<JobList jobs={jobs.items} />
		</div>
	);
}

export default HomePage;
