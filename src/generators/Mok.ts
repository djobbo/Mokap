type mokFn<T> = (...i: number[]) => T;

export class Mok<T> {
	fn: mokFn<T>;

	constructor(_fn: mokFn<T>) {
		this.fn = _fn;
	}
}

export type mok<T> = T | Mok<T>;
