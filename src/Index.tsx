import ReactDom from 'react-dom';
import App from './app';

if (process.env.MOCK) {
  require('./apis/mocks');
}

ReactDom.render(<App age={19} name="wjx" />, document.querySelector('#root'));
