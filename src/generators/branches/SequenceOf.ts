import { Mok, mok } from '../Mok';
import { mock } from '..';

export const mockSequenceOf = <T extends any[]>(
	...value: { [P in keyof T]: mok<T[P]> }
) =>
	new Mok<T>(
		(...indexes: number[]): T => value.map((x) => mock(x, ...indexes)) as T
	);
