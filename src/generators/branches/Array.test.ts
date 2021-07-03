import { mock } from '..';
import { Mok } from '../Mok';
import { mockArray } from './Array';

describe('Array', () => {
	it('creates an array (Fixed Value)', () => {
		const array = mock(mockArray(5, 8));
		expect(array.length).toBe(8);
	});

	it('creates an array (Fn Value)', () => {
		const fn = jest.fn();
		const mockFn = new Mok(fn);

		const array = mock(mockArray(mockFn, 12));
		expect(array.length).toBe(12);
		expect(fn).toBeCalledTimes(12);
	});
});
