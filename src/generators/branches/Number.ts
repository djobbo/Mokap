import { randomInt } from '../generators';
import { Mok, mok } from '../Mok';

/**
 * Returns a **Number Generator** which returns a random number between min and max when called.
 *
 * @param min - **static number** or **number generator** to
 * define the smallest number generatable.
 * @param max - **static number** or **number generator** to
 * define the largest number generatable.
 * @return Number Generator
 */
export const mockNumber = (min: mok<number>, max: mok<number>) =>
	new Mok<number>((): number => randomInt(min, max));
