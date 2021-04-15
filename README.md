# Mokap

Data mocking made fun

> **Disclaimer**  
> NPM package isn't up to date  
> Documentation is still being  
> Tests only cover a very small percentage of the code

## Installation

install via npm  
`$ npm install --save mokapjs`  
or yarn  
`$ yarn add mokapjs`

## Branches

### Boolean

```ts
import { bool } from 'mokapjs';

const randomBool = mock(bool);
```

### Number

```ts
import { num } from 'mokapjs';

// Will generate a number between 2 and 5
const numGen = num(2, 5);
const randomNum = mock(numGen); // e.g: 3

// Generators are reusable
const randomNum2 = mock(numGen); // e.g: 5
```

You can also generate bounds programmatically

```ts
import { num } from 'mokapjs';

const minGen = num(1, 3);
const maxGen = num(10, 15);

// Will generate a number between randomly generated min & max
const numGen = num(minGen, maxGen);

const randomNum = mock(numGen); // e.g: 4
```

### String

> Utility to mock strings using regular expressions

```ts
import { str } from 'mokapjs';

const strGen = str(/[A-Z][0-9]/);
const randomStr = mock(strGen); // e.g: "D3"
const randomStr2 = mock(strGen); // e.g: "H5"
```

### Array

```ts
import { arr } from 'mokapjs';

const arrGen = arr();
```
