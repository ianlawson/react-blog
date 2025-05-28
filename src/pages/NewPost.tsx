interface NewPostProps {
	handleSubmit: (id: React.FormEvent<HTMLFormElement>) => void;
	postTitle: string;
	setPostTitle: (value: string) => void;
	postBody: string;
	setPostBody: (value: string) => void;
}

export default function NewPost({
	handleSubmit,
	postTitle,
	setPostTitle,
	postBody,
	setPostBody,
}: NewPostProps) {
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
