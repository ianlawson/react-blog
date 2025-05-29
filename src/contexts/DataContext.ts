import React, { createContext, useEffect, useState } from "react";
import { useFetchPosts } from "../hooks/useFetchPosts";
import type { DataContextType, PostItem } from "../types";

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
	const [posts, setPosts] = useState<PostItem[]>([]);
	const [search, setSearch] = useState<string>("");
	const [searchResults, setSearchResults] = useState<PostItem[]>([]);
	const { data, fetchError, isLoading } = useFetchPosts();

	useEffect(() => {
		setPosts(data ?? []);
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

	const value: DataContextType = {
		// General UI state
		fetchError,
		isLoading,

		// Search state
		search,
		setSearch,
		searchResults,

		// Posts state
		posts,
		setPosts,
	};

	return React.createElement(DataContext.Provider, { value }, children);
};

export default DataContext;
