/**
 * Takes a board as a one dimensional array, the height and width of said board and returns an objet containing a cols and rows key as
 * an array of hints to display to solve the puzzle
 * @param {Number[][]} board The board as a one dimensional array.
 * @param {Number} height The height of the board.
 * @param {Number} width The width of the board.
 * @returns {{rows: Number[][], columns: Number[][]}} Returns an object containing two sets of two dimensional arrays known as rows and columns.
 */
export default function getHintsFromBoard(
	board: number[],
	height: number,
	width: number
): { rows: number[][]; columns: number[][] } {
	const rows: number[][] = [];
	const columns: number[][] = [];

	// Transforms 1D array into 2D array
	const twoDimensionalBoard = [];
	while (board.length) {
		twoDimensionalBoard.push(board.splice(0, width));
	}

	// Getting hints for the rows
	twoDimensionalBoard.forEach((row) => {
		const curRowHints: number[] = [];
		let curHint = 0;

		row.forEach((cell, i) => {
			// If begining of row
			if (i === 0) {
				if (cell === 1) {
					curHint++;
				}
				// Else if end of row
			} else if (i === width - 1) {
				if (cell === 1) {
					curHint++;
				}
				if (curHint > 0) {
					curRowHints.push(curHint);
					curHint = 0;
				}
			} else {
				if (cell === 1) {
					curHint++;
				} else if (cell === 0 && curHint > 0) {
					curRowHints.push(curHint);
					curHint = 0;
				}
			}
		});

		// Finally, either push the current array of hints or an array with a single value (0) if the array is empty
		if (curRowHints.length === 0) {
			rows.push([0]);
		} else {
			rows.push(curRowHints);
		}
	});

	// Getting hints for the columns
	for (let j = 0; j < width; j++) {
		const curColHints: number[] = [];
		let curHint = 0;

		for (let i = 0; i < height; i++) {
			const cell = twoDimensionalBoard[i][j];
			// If begining of column
			if (i === 0) {
				if (cell === 1) {
					curHint++;
				}
				// Else if end of column
			} else if (i === width - 1) {
				if (cell === 1) {
					curHint++;
				}
				if (curHint > 0) {
					curColHints.push(curHint);
					curHint = 0;
				}
			} else {
				if (cell === 1) {
					curHint++;
				} else if (cell === 0 && curHint > 0) {
					curColHints.push(curHint);
					curHint = 0;
				}
			}
		}

		// Finally, either push the current array of hints or an array with a single value (0) if the array is empty
		if (curColHints.length === 0) {
			columns.push([0]);
		} else {
			columns.push(curColHints);
		}
	}

	const hints = { rows, columns };

	return hints;
}
