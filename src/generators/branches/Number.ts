import { randomInt } from '../generators';
import { mok } from '../types';

export const mockNumber = (min: mok<number>, max: mok<number>) => () => randomInt(min, max);
