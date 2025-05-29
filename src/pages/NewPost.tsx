import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/posts";
import { useData } from "../hooks/useData";

export default function NewPost() {
	const { posts, setPosts } = useData();
	const [postTitle, setPostTitle] = useState<string>("");
	const [postBody, setPostBody] = useState<string>("");
	const navigate = useNavigate();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!postTitle.trim() || !postBody.trim()) return;
		const id = posts.length ? `${+posts[posts.length - 1].id + 1}` : "1";
		const post = {
			id,
			title: postTitle,
			datetime: new Date().toISOString(),
			body: postBody,
		};
		try {
			const response = await api.post("/posts", post);
			setPosts([...posts, response.data]);
			setPostTitle("");
			setPostBody("");
			navigate(`/post/${id}`);
		} catch (err: unknown) {
			if (err && typeof err === "object" && axios.isAxiosError(err)) {
				const axiosError = err as import("axios").AxiosError;
				console.error(
					"Error while submitting new post:",
					axiosError.response?.status,
					axiosError.response?.data || axiosError.message,
				);
			} else {
				console.error("Unexpected error while submitting new post:", err);
			}
		}
	};

	return (
		<main className="NewPost">
			<h2>New Post</h2>
			<form className="newPostForm" onSubmit={handleSubmit}>
				<label htmlFor="postTitle">Title</label>
				<input
					id="post"
					type="text"
					required
					value={postTitle}
					onChange={(e) => setPostTitle(e.target.value)}
				/>
				<label htmlFor="postBody">Post</label>
				<textarea
					id="postBody"
					required
					value={postBody}
					onChange={(e) => setPostBody(e.target.value)}
				/>
				<button type="submit">Submit</button>
			</form>
		</main>
	);
}
