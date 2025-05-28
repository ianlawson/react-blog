import Feed from "../components/Feed";
import type { PostItem } from "../types";

interface HomeProps {
	posts: PostItem[];
}

export default function Home({ posts }: HomeProps) {
	return (
		<main className="Home">
			{posts.length ? (
				<Feed posts={posts} />
			) : (
				<p style={{ marginTop: "2rem" }}>No posts to display.</p>
			)}
		</main>
	);
}
