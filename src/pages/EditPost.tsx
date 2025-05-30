import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDataStore } from "../store/dataStore";

export default function EditPost() {
	const { id } = useParams();
	const post = useDataStore((state) =>
		state.posts.find((post) => post.id === id),
	);
	const postTitle = useDataStore((state) => state.postTitle);
	const setPostTitle = useDataStore((state) => state.setPostTitle);
	const postBody = useDataStore((state) => state.postBody);
	const setPostBody = useDataStore((state) => state.setPostBody);
	const editPost = useDataStore((state) => state.editPost);
	const navigate = useNavigate();

	// biome-ignore lint/correctness/useExhaustiveDependencies(setPostTitle): Zustand actions are stable
	// biome-ignore lint/correctness/useExhaustiveDependencies(setPostBody): Zustand actions are stable
	useEffect(() => {
		if (post) {
			setPostTitle(post.title);
			setPostBody(post.body);
		}
	}, [post]);

	const handleEdit = async (id: string) => {
		const post = {
			id,
			title: postTitle,
			datetime: new Date().toISOString(),
			body: postBody,
		};
		try {
			await editPost(post);
			setPostTitle("");
			setPostBody("");
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
						<button
							type="submit"
							disabled={!postTitle.trim() || !postBody.trim()}
							onClick={() => handleEdit(post.id)}
						>
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
