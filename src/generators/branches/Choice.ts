import { randomValueFromArray } from '../generators';
import { mok } from '../types';
import { getMok } from '../';

export const mockChoice = <T>(...value: mok<T>[]): mok<T> => () => getMok(randomValueFromArray(value));
