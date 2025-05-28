import { Link } from "react-router-dom";

interface HeaderProps {
	title: string;
}

export default function Header({ title }: HeaderProps) {
	return (
		<header className="Header">
			<h1>
				<Link to="/">{title}</Link>
			</h1>
		</header>
	);
}
