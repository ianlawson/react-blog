import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Navigation from "./components/Navigation";
import About from "./pages/About";
import EditPost from "./pages/EditPost";
import Home from "./pages/Home";
import Missing from "./pages/Missing";
import NewPost from "./pages/NewPost";
import Post from "./pages/Post";
import { useDataStore } from "./store/dataStore";

export default function App() {
	const loadPosts = useDataStore((state) => state.loadPosts);

	// biome-ignore lint/correctness/useExhaustiveDependencies(loadPosts): Zustand actions are stable
	useEffect(() => {
		loadPosts();
	}, []);

	return (
		<div className="App">
			<Header title="React Blog" />
			<Navigation />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/post/new" element={<NewPost />} />
				<Route path="/post/edit/:id" element={<EditPost />} />
				<Route path="/post/:id" element={<Post />} />
				<Route path="/about" element={<About />} />
				<Route path="*" element={<Missing />} />
			</Routes>
			<Footer />
		</div>
	);
}
