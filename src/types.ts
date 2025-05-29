export interface PostItem {
	id: string;
	title: string;
	datetime: string;
	body: string;
}

export interface WindowSize {
	width: number | undefined;
	height: number | undefined;
}

export interface DataContextType {
	// General UI state
	fetchError: string | null;
	isLoading: boolean;

	// Search state
	search: string;
	setSearch: (value: string) => void;
	searchResults: PostItem[];

	// Posts state
	posts: PostItem[];
	setPosts: (value: PostItem[]) => void;
}
