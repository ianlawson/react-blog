import { useContext } from "react";
import DataContext from "../contexts/DataContext";
import type { DataContextType } from "../types";

export function useData(): DataContextType {
	const context = useContext(DataContext);
	if (!context) {
		throw new Error("useData must be used within DataProvider");
	}
	return context;
}
