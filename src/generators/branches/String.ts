import RandExp from 'randexp';

export const mockString = (value: RegExp) => () => new RandExp(value).gen();
