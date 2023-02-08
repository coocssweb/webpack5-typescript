import React from 'react';
import { add } from './utils';
interface IProps {
  name: string;
  age: number;
}

const App = (user: IProps) => {
  const result = add(1000, 2000);
  return <div>Hello World {result}</div>;
};

export default App;
