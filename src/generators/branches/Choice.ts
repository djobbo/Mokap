import { randomValueFromArray } from '../generators';
import { mock } from '../';
import { Mok, mok } from '../Mok';

/**
 * Returns a **Choice Generator** which returns a random element when called.
 *
 * @param ...values - List of **static values** and/or **generators** to be chosen from.
 * @return Choice Generator
 */
export const mockChoice = <T>(...values: mok<T>[]) =>
	new Mok<T>((...i: number[]): T => mock(randomValueFromArray(values), ...i));
