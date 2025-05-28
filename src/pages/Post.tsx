import { Link, useParams } from "react-router-dom";
import type { PostItem } from "../types";

interface PostProps {
	posts: PostItem[];
	handleDelete: (id: string) => void;
}

export default function Post({ posts, handleDelete }: PostProps) {
	const { id } = useParams();
	const post = posts.find((post) => post.id === id);
	return (
		<main className="PostPage">
			<article className="post">
				{post ? (
					<>
						<h2>{post.title}</h2>
						<p className="postDate">{post.datetime}</p>
						<p className="postBody">{post.body}</p>
						<Link to={`/post/edit/${post.id}`}>
							<button type="button" className="editButton">
								Edit Post
							</button>
						</Link>
						<button
							type="button"
							className="deleteButton"
							onClick={() => handleDelete(post.id)}
						>
							Delete Post
						</button>
					</>
				) : (
					<>
						<h2>Post Not Found</h2>
						<p>Well, that's disappointing</p>
						<p>
							<Link to="/">Visit Our Homepage</Link>
						</p>
					</>
				)}
			</article>
		</main>
	);
}
