import { mok } from './types';
import { getMok } from './';

export const randomNumber = (minMok: mok<number>, maxMok: mok<number>): number => {
    let [min, max] = [getMok(minMok), getMok(maxMok)];

    if (min > max) [min, max] = [max, min];
    return Math.random() * (max - min) + min;
};

export const randomInt = (min: mok<number>, max: mok<number>): number => Math.floor(randomNumber(min, max));

export const randomArray = <T>(length: mok<number>, fun: (...i: number[]) => T, indexes: number[] = []): T[] =>
    new Array(getMok(length)).fill(null).map((_, i) => fun(i, ...indexes));

export const randomDate = (start: Date, end: Date): Date =>
    new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

export const randomBoolean = (): boolean => !!randomInt(0, 2);

export const randomValueFromArray = <T>(arr: T[]): T => arr[randomInt(0, arr.length)];
