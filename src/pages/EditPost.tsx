import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import type { PostItem } from "../types";

interface EditPostProps {
	posts: PostItem[];
	handleEdit: (id: string) => void;
	editTitle: string;
	setEditTitle: (id: string) => void;
	editBody: string;
	setEditBody: (id: string) => void;
}

export default function EditPost({
	posts,
	handleEdit,
	editTitle,
	setEditTitle,
	editBody,
	setEditBody,
}: EditPostProps) {
	const { id } = useParams();
	const post = posts.find((post) => post.id === id);
	useEffect(() => {
		if (post) {
			setEditTitle(post.title);
			setEditBody(post.body);
		}
	}, [post, setEditTitle, setEditBody]);
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
