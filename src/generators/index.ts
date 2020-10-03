import { mok } from './types';

import { mockBoolean as bool } from './branches/Boolean';
import { mockArray as arr } from './branches/Array';
import { mockChoice as ch } from './branches/Choice';
import { mockNumber as num } from './branches/Number';
import { mockMap as map } from './branches/Map';
import { mockString as str } from './branches/String';

export const getMok = <T>(value: mok<T>, ...index: number[]): T =>
    value instanceof Function ? value(...index) : value;

export default {
    bool,
    arr,
    ch,
    num,
    map,
    str,
};
