import { randomArray } from '../generators';
import { mok } from '../types';
import { getMok } from '../';

export const mockArray = <T>(value: mok<T>, length: mok<number>) => (...indexes: number[]): T[] =>
    randomArray(getMok(length, ...indexes), (...i) => getMok(value, ...[...i, ...indexes]));
