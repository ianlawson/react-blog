import { useMemo } from "react";
import Feed from "../components/Feed";
import { useDataStore } from "../store/dataStore";

export default function Home() {
	const posts = useDataStore((state) => state.posts);
	const search = useDataStore((state) => state.search);
	const fetchError = useDataStore((state) => state.fetchError);
	const isLoading = useDataStore((state) => state.isLoading);

	const searchResults = useMemo(() => {
		return posts
			.filter(
				(post) =>
					post.body.toLowerCase().includes(search.toLowerCase()) ||
					post.title.toLowerCase().includes(search.toLowerCase()),
			)
			.sort(
				(a, b) =>
					new Date(b.datetime).getTime() - new Date(a.datetime).getTime(),
			);
	}, [posts, search]);

	return (
		<main className="Home">
			{isLoading && <p className="statusMsg">Loading posts...</p>}
			{!isLoading && fetchError && (
				<p className="statusMsg" style={{ color: "red" }}>
					{fetchError}
				</p>
			)}
			{!isLoading &&
				!fetchError &&
				(searchResults.length ? (
					<Feed posts={searchResults} />
				) : (
					<p className="statusMsg">No posts to display.</p>
				))}
		</main>
	);
}
