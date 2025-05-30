import { useNavigate } from "react-router-dom";
import { useDataStore } from "../store/dataStore";

export default function NewPost() {
	const posts = useDataStore((state) => state.posts);
	const postTitle = useDataStore((state) => state.postTitle);
	const setPostTitle = useDataStore((state) => state.setPostTitle);
	const postBody = useDataStore((state) => state.postBody);
	const setPostBody = useDataStore((state) => state.setPostBody);
	const savePost = useDataStore((state) => state.savePost);
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
			await savePost(post);
			setPostTitle("");
			setPostBody("");
			navigate(`/post/${id}`);
		} catch (err) {
			if (err instanceof Error) {
				console.error("Error while submitting new post:", err.message);
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
				<button type="submit" disabled={!postTitle.trim() || !postBody.trim()}>
					Submit
				</button>
			</form>
		</main>
	);
}
