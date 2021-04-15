import ret, { Char, Group, Set, Range, Root, Tokens, types } from 'ret';
import DRange from 'drange';
import { randomBoolean, randomInt, randomValueFromArray } from '../generators';

const {
	ROOT,
	GROUP,
	POSITION,
	SET,
	REPETITION,
	REFERENCE,
	CHAR,
	RANGE,
} = types;

export const mockString = (value: RegExp) => (): string => RandExp(value);

const toOtherCase = (code: number) =>
	code +
	(97 <= code && code <= 122 ? -32 : 65 <= code && code <= 90 ? 32 : 0);

const randomDRange = (arr: DRange) => arr.index(randomInt(0, arr.length - 1));

interface IGenOptions {
	ignoreCase: boolean;
	multiline: boolean;
	max: number;
	defaultRange: DRange;
}

export const RandExp = (regexp: RegExp): string => {
	const pattern = regexp.source;
	const options = {
		ignoreCase: regexp.ignoreCase,
		multiline: regexp.multiline,
		max: 100,
		defaultRange: new DRange(32, 126),
	};
	options.ignoreCase = regexp.ignoreCase;
	options.multiline = regexp.multiline;

	const tokens = ret(pattern);

	return gen(tokens, [], options)[0];
};

function genGroup(
	token: Root | Group,
	groups: string[] = [],
	options: IGenOptions
): [string, string[]] {
	const stack = token.options
		? randomValueFromArray(token.options)
		: token.stack || [];

	return stack.reduce(
		(acc, currentToken) => {
			const g = gen(currentToken, acc[1], options);
			return [acc[0] + g[0], g[1]];
		},
		['', groups]
	);
}

function gen(
	token: Tokens,
	groups: string[] = [],
	options: IGenOptions
): [string, string[]] {
	let str = '';
	let newGroups: string[] = groups;

	switch (token.type) {
		case ROOT:
			[str, newGroups] = genGroup(token, groups, options);
			break;

		case GROUP:
			// Ignore lookaheads for now.
			if (token.followedBy || token.notFollowedBy) break;

			[str, newGroups] = genGroup(token, groups, options);
			break;

		case POSITION:
			break;

		case SET: {
			const expandedSet = expandSet(token, options);
			str = expandedSet.length
				? String.fromCharCode(randomDRange(expandedSet))
				: '';
			break;
		}

		case REPETITION:
			{
				const n = randomInt(
					token.min,
					token.max === Infinity ? token.min + options.max : token.max
				);

				for (let i = 0; i < n; i++) {
					const g = gen(token.value, groups, options);
					[str, newGroups] = [(str += g[0]), g[1]];
				}
			}

			break;

		case REFERENCE:
			str = groups[token.value - 1] || '';
			break;

		case CHAR: {
			const code =
				options.ignoreCase && randomBoolean()
					? toOtherCase(token.value)
					: token.value;
			str = String.fromCharCode(code);
			break;
		}
	}
	return [str, newGroups];
}

function expandSet(token: Char | Range | Set, options: IGenOptions) {
	switch (token.type) {
		case CHAR:
			return new DRange(token.value);

		case RANGE:
			return new DRange(token.from, token.to);

		case SET: {
			const drange = new DRange();

			for (let i = 0; i < token.set.length; i++) {
				const subrange = expandSet(token.set[i], options);
				drange.add(subrange);

				if (options.ignoreCase)
					for (let j = 0; j < subrange.length; j++) {
						const code = subrange.index(j);
						const otherCaseCode = toOtherCase(code);
						if (code !== otherCaseCode) drange.add(otherCaseCode);
					}
			}

			return token.not
				? options.defaultRange.clone().subtract(drange)
				: options.defaultRange.clone().intersect(drange);
		}
	}
}
