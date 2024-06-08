/**
 * Takes a height and a width and returns a one dimensional array of appropriate size
 * filed with zeros.
 * @param {number} height The height of the board
 * @param {number} width The width of the board
 */
export default function resetBoard(height: number, width: number) {
	return Array.from({ length: height * width }, () => 0);
}
