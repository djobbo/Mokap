import { randomBoolean } from '../generators';
import { Mok } from '../Mok';

/**
 * Returns a **Boolean Generator** which returns a random boolean when called.
 *
 * @return Boolean Generator
 */
export const mockBoolean = new Mok<boolean>(randomBoolean);
