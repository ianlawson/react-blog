import { Link } from "react-router-dom";

interface NavigationProps {
	search: string;
	setSearch: (value: string) => void;
}

export default function Navigation({ search, setSearch }: NavigationProps) {
	return (
		<nav className="Navigation">
			<form className="searchForm" onSubmit={(e) => e.preventDefault()}>
				<label htmlFor="search">Search Posts</label>
				<input
					id="search"
					type="text"
					placeholder="Search Posts"
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				/>
			</form>
			<ul>
				<li>
					<Link to="/post/new">Post</Link>
				</li>
				<li>
					<Link to="/about">About</Link>
				</li>
			</ul>
		</nav>
	);
}
