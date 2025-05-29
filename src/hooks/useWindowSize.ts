import { useEffect, useState } from "react";
import type { WindowSize } from "../types";

const RESIZE_EVENT = "resize";

const useWindowSize = () => {
	const [windowSize, setWindowSize] = useState<WindowSize>({
		width: undefined,
		height: undefined,
	});

	useEffect(() => {
		const handleResize = () => {
			setWindowSize({
				width: window.innerWidth,
				height: window.innerHeight,
			});
		};
		handleResize();

		window.addEventListener(RESIZE_EVENT, handleResize);
		return () => {
			window.removeEventListener(RESIZE_EVENT, handleResize);
		};
	}, []);

	return windowSize;
};

export default useWindowSize;
