# recoildux

[![Build Status](https://travis-ci.com/dai-shi/recoildux.svg?branch=master)](https://travis-ci.com/dai-shi/recoildux)
[![npm version](https://badge.fury.io/js/recoildux.svg)](https://badge.fury.io/js/recoildux)
[![bundle size](https://badgen.net/bundlephobia/minzip/recoildux)](https://bundlephobia.com/result?p=recoildux)

Recoil inspired implementation with Redux

## Introduction

I have been developing an unofficial React Redux library
called [reactive-react-redux](https://github.com/dai-shi/reactive-react-redux).
Its v5 is implemented with useMutableSource and
it no longer depends on React Context.

Now, [Recoil](https://recoiljs.org) came and it's nice and scalable
with the atom abstraction.
It would be possible to implement the same idea with Redux.
Conceptually, it's not well-known Redux
because it's no longer single source of truth.
The idea is a Redux store is an atom.

This isn't meant to provide a Recoil alternative,
but as a comparison purpose, it provides a subset of the Recoil API.

## Install

```bash
npm install recoildux
```

## Usage

```javascript
import React from 'react';
import ReactDOM from 'react-dom';

import { atom, useRecoilState } from 'recoildux';

const countAtom = atom({ key: 'count', default: 0 });
const textAtom = atom({ key: 'text', default: 'hello' });

const Counter = () => {
  const [count, setCount] = useRecoilState(countAtom);
  return (
    <div>
      {Math.random()}
      <div>
        <span>Count: {count}</span>
        <button type="button" onClick={() => setCount(count + 1)}>+1</button>
        <button type="button" onClick={() => setCount((c) => c - 1)}>-1</button>
      </div>
    </div>
  );
};

const TextBox = () => {
  const [text, setText] = useRecoilState(textAtom);
  return (
    <div>
      {Math.random()}
      <div>
        <span>Text: {text}</span>
        <input value={text} onChange={(event) => setText(event.target.value)} />
      </div>
    </div>
  );
};

const App = () => (
  <>
    <h1>Counter</h1>
    <Counter />
    <Counter />
    <h1>TextBox</h1>
    <TextBox />
    <TextBox />
  </>
);

ReactDOM.unstable_createRoot(document.getElementById('app')).render(<App />);
```

## API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

## Examples

The [examples](examples) folder contains working examples.
You can run one of them with

```bash
PORT=8080 npm run examples:01_minimal
```

and open <http://localhost:8080> in your web browser.

You can also try them in codesandbox.io:
[01](https://codesandbox.io/s/github/dai-shi/recoildux/tree/master/examples/01_minimal)
[02](https://codesandbox.io/s/github/dai-shi/recoildux/tree/master/examples/02_typescript)
