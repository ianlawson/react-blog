import { Link } from "react-router-dom";
import type { PostItem } from "../types";
import { formatDateTime } from "../utils";

interface PostCardProps {
	post: PostItem;
}
export default function PostCard({ post }: PostCardProps) {
	return (
		<article className="post">
			<Link to={`/post/${post.id}`}>
				<h2>{post.title}</h2>
				<p className="postDate">{formatDateTime(post.datetime)}</p>
			</Link>
			<p className="postBody">
				{post.body.length <= 25 ? post.body : `${post.body.slice(0, 25)}...`}
			</p>
		</article>
	);
}
