import type React from "react";
import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import api from "./api/posts";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Navigation from "./components/Navigation";
import useAxiosFetch from "./hooks/useAxiosFetch";
import useWindowSize from "./hooks/useWindowSize";
import About from "./pages/About";
import EditPost from "./pages/EditPost";
import Home from "./pages/Home";
import Missing from "./pages/Missing";
import NewPost from "./pages/NewPost";
import Post from "./pages/Post";
import type { PostItem } from "./types";

export default function App() {
	const [posts, setPosts] = useState<PostItem[]>([]);
	const [search, setSearch] = useState<string>("");
	const [searchResults, setSearchResults] = useState<PostItem[]>([]);
	const [postTitle, setPostTitle] = useState<string>("");
	const [postBody, setPostBody] = useState<string>("");
	const [editTitle, setEditTitle] = useState<string>("");
	const [editBody, setEditBody] = useState<string>("");
	const navigate = useNavigate();
	const { width } = useWindowSize();
	const { data, fetchError, isLoading } = useAxiosFetch<PostItem>(
		"http://localhost:3500/posts",
	);

	useEffect(() => {
		setPosts(data);
	}, [data]);

	useEffect(() => {
		setSearchResults(
			posts
				.filter(
					(post) =>
						post.body.toLowerCase().includes(search.toLowerCase()) ||
						post.title.toLowerCase().includes(search.toLowerCase()),
				)
				.reverse(),
		);
	}, [posts, search]);

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
			if (err && typeof err === "object" && "isAxiosError" in err) {
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

	const handleEdit = async (id: string) => {
		const post = {
			id,
			title: editTitle,
			datetime: new Date().toISOString(),
			body: editBody,
		};
		try {
			const response = await api.put(`/posts/${id}`, post);
			setPosts(
				posts.map((post) => (post.id === id ? { ...response.data } : post)),
			);
			setEditTitle("");
			setEditBody("");
			navigate("/");
		} catch (err: unknown) {
			if (err && typeof err === "object" && "isAxiosError" in err) {
				const axiosError = err as import("axios").AxiosError;
				console.error(
					`Error while editing post (id: ${id}):`,
					axiosError.response?.status,
					axiosError.response?.data || axiosError.message,
				);
			} else {
				console.error("Unexpected error while editing post:", err);
			}
		}
	};

	const handleDelete = async (id: string) => {
		try {
			await api.delete(`/posts/${id}`);
			setPosts(posts.filter((post) => post.id !== id));
			navigate("/");
		} catch (err: unknown) {
			if (err && typeof err === "object" && "isAxiosError" in err) {
				const axiosError = err as import("axios").AxiosError;
				console.error(
					`Error while deleting post (id: ${id}):`,
					axiosError.response?.status,
					axiosError.response?.data || axiosError.message,
				);
			} else {
				console.error("Unexpected error while deleting post:", err);
			}
		}
	};

	return (
		<div className="App">
			<Header title="React Blog" width={width} />
			<Navigation search={search} setSearch={setSearch} />
			<Routes>
				<Route
					path="/"
					element={
						<Home
							posts={searchResults}
							fetchError={fetchError}
							isLoading={isLoading}
						/>
					}
				/>
				<Route
					path="/post/new"
					element={
						<NewPost
							handleSubmit={handleSubmit}
							postTitle={postTitle}
							setPostTitle={setPostTitle}
							postBody={postBody}
							setPostBody={setPostBody}
						/>
					}
				/>
				<Route
					path="/post/edit/:id"
					element={
						<EditPost
							posts={posts}
							handleEdit={handleEdit}
							editTitle={editTitle}
							setEditTitle={setEditTitle}
							editBody={editBody}
							setEditBody={setEditBody}
						/>
					}
				/>
				<Route
					path="/post/:id"
					element={<Post posts={posts} handleDelete={handleDelete} />}
				/>
				<Route path="/about" element={<About />} />
				<Route path="*" element={<Missing />} />
			</Routes>
			<Footer />
		</div>
	);
}
