import { mok, Mok } from './Mok';

import { mockBoolean as bool } from './branches/Boolean';
import { mockArray as array } from './branches/Array';
import { mockSequenceOf as sequenceOf } from './branches/SequenceOf';
import { mockChoice as choice } from './branches/Choice';
import { mockNumber as num } from './branches/Number';
import { mockMap as map } from './branches/Map';
import { mockString as str } from './branches/String';

export const mock = <T>(value: mok<T>, ...index: number[]): T =>
	value instanceof Mok ? value.fn(...index) : value;
// typeof value === 'function' ? value value(...index) : value;

export default {
	bool,
	array,
	sequenceOf,
	choice,
	num,
	map,
	str,
};
