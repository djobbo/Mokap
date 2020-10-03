import { randomValueFromArray } from '../generators';
import { mok } from '../types';
import { getMok } from '../';

export const mockChoice = <T>(...value: mok<T>[]) => (...i: number[]): T => getMok(randomValueFromArray(value), ...i);
