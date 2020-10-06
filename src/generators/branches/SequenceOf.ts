import { mok } from '../types';
import { getMok } from '..';

type ArrayMok<T> = {
    [P in keyof T]?: mok<P>;
};

export const mockSequenceOf = <T extends any[]>(...value: ArrayMok<T>) => (...indexes: number[]) =>
    value.map((x) => getMok(x, ...indexes));

const m = mockSequenceOf(() => 1, 2, 3, '4');
