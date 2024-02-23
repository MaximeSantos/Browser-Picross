import type { PuzzleType } from '$lib/types/types';

export default function parsePuzzle(): PuzzleType {
	return { width: 0, height: 0, hints: { rows: [[]], cols: [[]] }, solution: [] };
}
