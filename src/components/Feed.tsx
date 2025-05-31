import type { PostItem } from "../types";
import PostCard from "./PostCard";

interface FeedProps {
	posts: PostItem[];
}

export default function Feed({ posts }: FeedProps) {
	return (
		<>
			{posts.map((post) => (
				<PostCard key={post.id} post={post} />
			))}
		</>
	);
}
