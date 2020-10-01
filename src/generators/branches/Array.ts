import { randomArray, randomInt } from '../generators';
import { mok } from '../types';
import { getMok } from '../';
import { hasOwnProperty } from '../../util/hasOwnProperty';

export const mockArray = <T>(value: mok<T>, length: mok<number> | { min: mok<number>; max: mok<number> } = 0) => () =>
    randomArray(hasOwnProperty(length, 'min') ? randomInt(length.min, length.max) : getMok(length), (index) => {
        return getMok(value, index);
    });
