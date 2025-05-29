import { FaLaptop, FaMobileAlt, FaTabletAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useWindowSize } from "../hooks/useWindowSize";

interface HeaderProps {
	title: string;
}

export default function Header({ title }: HeaderProps) {
	const { width } = useWindowSize();

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
