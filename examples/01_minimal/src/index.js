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
