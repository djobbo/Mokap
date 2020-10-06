import { mok } from './types';
import moks, { getMok } from './';

type IJSONMok = IJSONStr | IJSONNumber | IJSONBoolean | IJSONChoice | IJSONMap | string;

export const parseMok = (jsonMok: IJSONMok): mok<unknown> => {
    if (typeof jsonMok === 'string') return jsonMok;
    switch (jsonMok.type) {
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

interface IJSONStr {
    type: 'str';
    regex: string;
}

export const parseStr = ({ regex }: IJSONStr): mok<string> => moks.str(new RegExp(regex));

interface IJSONNumber {
    type: 'int' | 'float';
    min: number | IJSONNumber;
    max: number | IJSONNumber;
}

export const parseNumber = ({ min, max }: IJSONNumber): mok<number> =>
    moks.num(typeof min === 'number' ? min : parseNumber(min), typeof max === 'number' ? max : parseNumber(max));

interface IJSONBoolean {
    type: 'bool';
}

export const parseBool = (): mok<boolean> => moks.bool;

interface IJSONChoice {
    type: 'choice';
    choices: IJSONMok[];
}

export const parseChoice = ({ choices }: IJSONChoice): mok<unknown> => moks.choice(...choices.map(parseMok));

interface IJSONMap {
    type: 'map';
    items: [string, IJSONMok][];
}

export const parseMap = ({ items }: IJSONMap): mok<unknown> =>
    moks.map(items.reduce((acc, [name, val]) => ({ ...acc, [name]: parseMok(val) }), {}));

const test: IJSONMok = {
    type: 'map',
    items: [
        [
            'yolo',
            {
                type: 'choice',
                choices: [
                    'yolo',
                    {
                        type: 'bool',
                    },
                    {
                        type: 'str',
                        regex: '[A-Z]',
                    },
                ],
            },
        ],
    ],
};

const a = parseMok(test);
console.log(getMok(a));
