import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { updatePost } from "../api/posts";
import { useData } from "../hooks/useData";

export default function EditPost() {
	const { posts, setPosts } = useData();
	const [editTitle, setEditTitle] = useState<string>("");
	const [editBody, setEditBody] = useState<string>("");
	const navigate = useNavigate();
	const { id } = useParams();

	const post = posts.find((post) => post.id === id);

	useEffect(() => {
		if (post) {
			setEditTitle(post.title);
			setEditBody(post.body);
		}
	}, [post]);

	const handleEdit = async (id: string) => {
		const post = {
			id,
			title: editTitle,
			datetime: new Date().toISOString(),
			body: editBody,
		};
		try {
			const updatedPost = await updatePost(id, post);
			setPosts(posts.map((p) => (p.id === id ? updatedPost : p)));
			setEditTitle("");
			setEditBody("");
			navigate(`/post/${id}`);
		} catch (err) {
			if (err instanceof Error) {
				console.error(`Error while editing post (id: ${id}):`, err.message);
			} else {
				console.error("Unexpected error while editing post:", err);
			}
		}
	};

	return (
		<main className="NewPost">
			{post ? (
				<>
					<h2>Edit Post</h2>
					<form className="newPostForm" onSubmit={(e) => e.preventDefault()}>
						<label htmlFor="postTitle">Title</label>
						<input
							id="post"
							type="text"
							required
							value={editTitle}
							onChange={(e) => setEditTitle(e.target.value)}
						/>
						<label htmlFor="postBody">Post</label>
						<textarea
							id="postBody"
							required
							value={editBody}
							onChange={(e) => setEditBody(e.target.value)}
						/>
						<button type="submit" onClick={() => handleEdit(post.id)}>
							Submit
						</button>
					</form>
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
		</main>
	);
}
