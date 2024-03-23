/**
 * Takes an action, the state of the current cell, and the state of the cell the dragging started on and returns the proper value for the state of the cell.
 * @param {Number} action It is the result expected from the current click/drag. Left click is 1, right click is 0, middle click is -1.
 * @param {Number} curCell Type of the cell being mouseover'd.
 * @param {Number} startDragOn Type of the cell teh dragging started on.
 * @returns {Number} Returns the next state for the cell as a number. -1 for empty, 0 for crossed, 1 for full.
 */
export default function getNextCellStateOnMouseOver(
	action: number | null,
	curCell: number,
	startDragOn: number
): number {
	// Now we check if we go to delete or write mode :
	if (action != null) {
		if (action == startDragOn) {
			// Delete mode : we only execute on cells of the same type as startDragOn, our output is alway -1
			if (curCell == startDragOn) {
				return 0;
			}
		} else {
			// Write mode : we only execute on empty cells or on the same cell type we started dragging on, our output is always our action
			if (curCell == 0 || curCell == startDragOn) {
				return action;
			}
		}
	}
	return curCell;
}
