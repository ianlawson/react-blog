import { useEffect, useState } from "react";
import { fetchPosts } from "../api/posts";
import type { PostItem } from "../types";

export function useFetchPosts() {
	const [data, setData] = useState<PostItem[] | null>(null);
	const [fetchError, setFetchError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	useEffect(() => {
		let isMounted = true;
		const getData = async () => {
			setIsLoading(true);
			try {
				const data = await fetchPosts();
				if (isMounted) {
					setData(data);
					setFetchError(null);
				}
			} catch (err) {
				if (isMounted) {
					setFetchError(
						err instanceof Error ? err.message : "An unknown error occurred",
					);
					setData(null);
				}
			} finally {
				if (isMounted) setIsLoading(false);
			}
		};

		getData();

		return () => {
			isMounted = false;
		};
	}, []);

	return { data, fetchError, isLoading };
}
