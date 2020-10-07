import { mok } from '../types';
import { getMok } from '..';

export const mockSequenceOf = <T extends any[]>(...value: { [P in keyof T]: mok<T[P]> }) => (...indexes: number[]): T =>
  value.map((x) => getMok(x, ...indexes)) as any;
