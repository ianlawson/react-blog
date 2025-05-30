import { create } from "zustand";
import { createPost, fetchPosts, removePost, updatePost } from "../api/posts";
import type { PostItem } from "../types";

interface DataStore {
	// Core post state
	posts: PostItem[];

	// Async actions for posts
	loadPosts: () => Promise<void>;
	savePost: (post: PostItem) => Promise<void>;
	editPost: (post: PostItem) => Promise<void>;
	deletePost: (id: string) => Promise<void>;

	// Post form state
	postTitle: string;
	setPostTitle: (title: string) => void;
	postBody: string;
	setPostBody: (body: string) => void;

	// Search state
	search: string;
	setSearch: (search: string) => void;

	// UI state
	fetchError: string | null;
	isLoading: boolean;
}

export const useDataStore = create<DataStore>((set, get) => ({
	// Core post state
	posts: [],

	// Async actions for posts
	async loadPosts() {
		set({ isLoading: true, fetchError: null });
		try {
			const data = await fetchPosts();
			set({ posts: data });
		} catch (err) {
			if (err instanceof Error) {
				console.error("Error while loading posts:", err.message);
				set({ fetchError: err.message });
			} else {
				console.error("Unexpected error while loading posts:", err);
				set({ fetchError: "Unknown error" });
			}
		} finally {
			set({ isLoading: false });
		}
	},

	async savePost(post) {
		const posts = get().posts;
		try {
			const newPost = await createPost(post);
			set({ posts: [...posts, newPost] });
		} catch (err) {
			if (err instanceof Error) {
				console.error("Error while submitting new post:", err.message);
			} else {
				console.error("Unexpected error while submitting new post:", err);
			}
		}
	},

	async editPost(post) {
		const posts = get().posts;
		const { id } = post;
		try {
			const updatedPost = await updatePost(post);
			set({ posts: posts.map((p) => (p.id === id ? updatedPost : p)) });
		} catch (err) {
			if (err instanceof Error) {
				console.error(`Error while editing post (id: ${id}):`, err.message);
			} else {
				console.error("Unexpected error while editing post:", err);
			}
		}
	},

	async deletePost(id) {
		const posts = get().posts;
		try {
			await removePost(id);
			set({ posts: posts.filter((post) => post.id !== id) });
		} catch (err) {
			if (err instanceof Error) {
				console.error(`Error while deleting post (id: ${id}):`, err.message);
			} else {
				console.error("Unexpected error while deleting post:", err);
			}
		}
	},

	// Post form state
	postTitle: "",
	setPostTitle: (title) => set({ postTitle: title }),
	postBody: "",
	setPostBody: (body) => set({ postBody: body }),

	// Search state
	search: "",
	setSearch: (search) => set({ search }),

	// UI state
	fetchError: null,
	isLoading: false,
}));
