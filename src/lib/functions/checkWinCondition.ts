/**
 * Compares the current board to the solution. The position of all '1' values must exactly match to return true.
 * @param board An array of numbers where -1 == empty / 0 == crossed / 1 == full
 * @param solution An array of numbers where 0 == crossed / 1 == full
 * @returns Returns true only if all '1' values of of the board match the solution.
 */
export default function checkWinCondition(board: number[], solution: number[]): boolean {
	for (let i = 0, l = board.length; i < l; i++) {
		// Checks that every 1s in the solution have a counterpart the board.
		// Also checks that there are no 1 on the board where a 0 is in the solution.
		if ((solution[i] == 1 && board[i] != 1) || (solution[i] == 0 && board[i] == 1)) {
			return false;
		}
	}
	return true;
}
