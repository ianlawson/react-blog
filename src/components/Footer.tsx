import { useDataStore } from "../store/dataStore";

export default function Footer() {
	const postCount = useDataStore((state) => state.posts.length);
	return (
		<footer className="Footer">
			<p>{postCount} posts</p>
		</footer>
	);
}
