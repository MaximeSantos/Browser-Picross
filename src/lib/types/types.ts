export type PuzzleType = {
	width: number;
	height: number;
	hints: { rows: number[][]; cols: number[][] };
	solution: number[];
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
