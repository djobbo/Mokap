import { mok } from './types';
import moks, { getMok } from './';

export type IJSONMok = IJSONStr | IJSONNumber | IJSONBoolean | IJSONContainer | IJSONMap | IJSONArray | string;

export const parseMok = (jsonMok: IJSONMok): mok<unknown> => {
    if (typeof jsonMok === 'string') return jsonMok;
    switch (jsonMok.mokType) {
        default:
            return '';
        case 'str':
            return parseStr(jsonMok);
        case 'int':
            return parseNumber(jsonMok);
        case 'float':
            return parseNumber(jsonMok);
        case 'bool':
            return parseBool();
        case 'choice':
            return parseChoice(jsonMok);
        case 'map':
            return parseMap(jsonMok);
    }
};

export interface IJSONStr {
    mokType: 'str';
    regex: string;
}

export const parseStr = ({ regex }: IJSONStr): mok<string> => moks.str(new RegExp(regex));

export interface IJSONNumber {
    mokType: 'int' | 'float';
    min: number | IJSONNumber;
    max: number | IJSONNumber;
}

export const parseNumber = ({ min, max }: IJSONNumber): mok<number> =>
    moks.num(typeof min === 'number' ? min : parseNumber(min), typeof max === 'number' ? max : parseNumber(max));

export interface IJSONBoolean {
    mokType: 'bool';
}

export const parseBool = (): mok<boolean> => moks.bool;

export interface IJSONContainer {
    mokType: 'choice' | 'sequenceOf';
    items: IJSONMok[];
}

export const parseChoice = ({ items }: IJSONContainer): mok<unknown> => moks.choice(...items.map(parseMok));
export const parseSequenceOf = ({ items }: IJSONContainer): mok<unknown> => moks.sequenceOf(...items.map(parseMok));

export interface IJSONMap {
    mokType: 'map';
    items: [string, IJSONMok][];
}

export const parseMap = ({ items }: IJSONMap): mok<unknown> =>
    moks.map(items.reduce((acc, [name, val]) => ({ ...acc, [name]: parseMok(val) }), {}));

export interface IJSONArray {
    mokType: 'array';
    item: IJSONMok;
    length: number | IJSONNumber;
}

export const parseArray = ({ item, length }: IJSONArray): mok<unknown> =>
    moks.array(parseMok(item), typeof length === 'number' ? length : parseNumber(length));

const test: IJSONMok = {
    mokType: 'map',
    items: [
        [
            'yolo',
            {
                mokType: 'choice',
                items: [
                    'yolo',
                    {
                        mokType: 'bool',
                    },
                    {
                        mokType: 'str',
                        regex: '[A-Z]',
                    },
                ],
            },
        ],
    ],
};

const a = parseMok(test);
console.log(getMok(a));
