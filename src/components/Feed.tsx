import type { PostItem } from "../types";
import Post from "./Post";

interface FeedProps {
	posts: PostItem[];
}

export default function Feed({ posts }: FeedProps) {
	return (
		<>
			{posts.map((post) => (
				<Post key={post.id} post={post} />
			))}
		</>
	);
}
