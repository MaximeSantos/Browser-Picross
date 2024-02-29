export type PuzzleType = {
	id: string;
	catalogue: string;
	title: string;
	author: string;
	copyright: string;
	licence: string;
	collectionId: string;
	collectionName: string;
	height: number;
	width: number;
	rows: number[][];
	columns: number[][];
	solution: number[];
	created: string;
	updated: string;
};

// 0 == Left Click / 2 == Right Click / 1 == Middle Click
export type MouseDownType = {
	button: number;
	index: number;
};

// 1 == Left Click / 2 == Right Click / 4 == Middle Click
export type MouseOverType = {
	buttons: number;
	index: number;
};
