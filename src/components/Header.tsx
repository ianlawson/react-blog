import { FaLaptop, FaMobileAlt, FaTabletAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

interface HeaderProps {
	title: string;
	width: number | undefined;
}

export default function Header({ title, width }: HeaderProps) {
	return (
		<header className="Header">
			<h1>
				<Link to="/">{title}</Link>
			</h1>
			{typeof width === "number" &&
				(width < 768 ? (
					<FaMobileAlt />
				) : width < 992 ? (
					<FaTabletAlt />
				) : (
					<FaLaptop />
				))}
		</header>
	);
}
