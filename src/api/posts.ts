import type { PostItem } from "../types";

const BASE_URL = "http://localhost:3500";

export async function fetchPosts(): Promise<PostItem[]> {
	try {
		const response = await fetch(`${BASE_URL}/posts`);
		if (!response.ok)
			throw new Error(`Failed to fetch posts: ${response.status}`);
		return await response.json();
	} catch (error) {
		console.error(error);
		throw error;
	}
}

export async function createPost(post: PostItem): Promise<PostItem> {
	try {
		const response = await fetch(`${BASE_URL}/posts`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(post),
		});
		if (!response.ok)
			throw new Error(`Failed to create post: ${response.status}`);
		return await response.json();
	} catch (error) {
		console.error(error);
		throw error;
	}
}

export async function updatePost(post: PostItem): Promise<PostItem> {
	try {
		const response = await fetch(`${BASE_URL}/posts/${post.id}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(post),
		});
		if (!response.ok)
			throw new Error(`Failed to update post: ${response.status}`);
		return await response.json();
	} catch (error) {
		console.error(error);
		throw error;
	}
}

export async function removePost(id: string): Promise<void> {
	try {
		const response = await fetch(`${BASE_URL}/posts/${id}`, {
			method: "DELETE",
		});
		if (!response.ok)
			throw new Error(`Failed to delete post: ${response.status}`);
	} catch (error) {
		console.error(error);
		throw error;
	}
}
