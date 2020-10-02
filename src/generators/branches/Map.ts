import { mok } from '../types';
import { getMok } from '../';

export const mockMap = <T>(value: { [K in keyof T]: mok<T[K]> }) => (...i: number[]): { [K in keyof T]: T[K] } =>
    Object.entries(value).reduce<{ [K in keyof T]?: T[K] }>(
        (acc, [key, val]) => ({
            ...acc,
            [key]: getMok(val, ...i),
        }),
        {},
    ) as any;
