import { Mok, mok } from '../Mok';
import { mock } from '../';

export const mockMap = <T>(value: { [K in keyof T]: mok<T[K]> }) =>
	new Mok<T>(
		(...i: number[]): { [K in keyof T]: T[K] } =>
			Object.entries(value).reduce<{ [K in keyof T]?: T[K] }>(
				(acc, [key, val]) => ({
					...acc,
					[key]: mock(val, ...i),
				}),
				{}
			) as T
	);
