import Feed from "../components/Feed";
import type { PostItem } from "../types";

interface HomeProps {
	posts: PostItem[];
	fetchError: string | null;
	isLoading: boolean;
}

export default function Home({ posts, fetchError, isLoading }: HomeProps) {
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
				(posts.length ? (
					<Feed posts={posts} />
				) : (
					<p className="statusMsg">No posts to display.</p>
				))}
		</main>
	);
}
