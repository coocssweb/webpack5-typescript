import '@logger';
import Account from './containers/Account/Account';
import Main from './containers/Main/Main';

interface IProps {
  name: string;
  age: number;
}

const App = (user: IProps) => {
  return <Main />;
};

export default App;
