import axios from "axios";
import { useEffect, useState } from "react";

const useAxiosFetch = <T>(dataUrl: string) => {
	const [data, setData] = useState<T[]>([]);
	const [fetchError, setFetchError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	useEffect(() => {
		const controller = new AbortController();

		const fetchData = async (url: string) => {
			setIsLoading(true);
			try {
				const response = await axios.get<T[]>(url, {
					signal: controller.signal,
				});
				setData(response.data);
				setFetchError(null);
			} catch (err: unknown) {
				if (axios.isAxiosError(err)) {
					// Ignore abort errors
					if (err.code === "ERR_CANCELED") return;
					setFetchError(err.message);
				} else if (err && typeof err === "object" && "message" in err) {
					setFetchError((err as { message: string }).message);
				} else {
					setFetchError("An unknown error occurred");
				}
				setData([]);
			} finally {
				setIsLoading(false);
			}
		};

		fetchData(dataUrl);

		return () => {
			controller.abort();
		};
	}, [dataUrl]);

	return { data, fetchError, isLoading };
};

export default useAxiosFetch;
