import '@logger';
import Account from './containers/Account/Account';

interface IProps {
  name: string;
  age: number;
}

const App = (user: IProps) => {
  return (
    <div>
      Hello WorldSSS
      <Account />
    </div>
  );
};

export default App;
