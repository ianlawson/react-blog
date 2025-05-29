import { Link, useNavigate, useParams } from "react-router-dom";
import { deletePost } from "../api/posts";
import { useData } from "../hooks/useData";
import { formatDateTime } from "../utils";

export default function Post() {
	const { posts, setPosts } = useData();
	const { id } = useParams();
	const navigate = useNavigate();

	const post = posts.find((post) => post.id === id);

	const handleDelete = async (id: string) => {
		try {
			await deletePost(id);
			setPosts(posts.filter((post) => post.id !== id));
			navigate("/");
		} catch (err) {
			if (err instanceof Error) {
				console.error(`Error while deleting post (id: ${id}):`, err.message);
				// Optionally, set error state here to display in the UI
			} else {
				console.error("Unexpected error while deleting post:", err);
			}
		}
	};

	return (
		<main className="PostPage">
			<article className="post">
				{post ? (
					<>
						<h2>{post.title}</h2>
						<p className="postDate">{formatDateTime(post.datetime)}</p>
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
