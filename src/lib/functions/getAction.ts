/**
 * Takes a mousedown or mouseover event as well as a button number and returns the corresponding value for our nonogram format.
 * @param {String} event The name of the event. Can be mousedown or mouseover.
 * @param {Number} button The value of the button. Differs between the two events.
 * @returns {Number|Null} Returns 0 for an empty cell on a middle click, -1 for a crossed cell on a right click and 1 for a full cell on a left click.
 */
export default function getAction(event: string, button: number): number | null {
	if (event == 'mousedown') {
		// Left click is 0 / Right click is 2 / Middle click is 1
		return button == 0 ? 1 : button == 2 ? -1 : button == 1 ? 0 : null;
	} else if (event == 'mouseover') {
		// Left click is 1 / Right click is 2 / Middle click is 4
		return button == 1 ? 1 : button == 2 ? -1 : button == 4 ? 0 : null;
	}
	return null;
}
