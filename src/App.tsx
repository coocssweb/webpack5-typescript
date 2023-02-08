interface IProps {
  name: string;
  age: number;
}

const App = (user: IProps) => {
  return <div>Hello World</div>;
};

export default App;
