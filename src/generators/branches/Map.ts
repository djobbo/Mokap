import { mok } from '../types';
import { getMok } from '../';

export const mockMap = <T extends keyof any, U>(value: { [k in T]: mok<U> }) => () =>
    Object.entries<mok<U>>(value).reduce<{ [k in T]?: mok<U> }>(
        (acc, [key, val]) => ({ ...acc, [key]: getMok(val) }),
        {},
    );
