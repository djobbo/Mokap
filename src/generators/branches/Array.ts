import { randomArray } from '../generators';
import { mock } from '..';
import { Mok, mok } from '../Mok';

/**
 * Returns a **Array Generator** which returns a random array when called.
 *
 * @param value - **static value** or **generator** to be repeated.
 * @param length - **static number** or **number generator** to
 * define the length of the generated array.
 * @return Array Generator
 */
export const mockArray = <T>(value: mok<T>, length: mok<number>) =>
	new Mok<T[]>((...indexes: number[]): T[] =>
		randomArray(mock(length, ...indexes), (...i) =>
			mock(value, ...[...i, ...indexes])
		)
	);

mockArray;
