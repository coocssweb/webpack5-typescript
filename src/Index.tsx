import ReactDom from 'react-dom';
import App from './app';

if (process.env.MOCK) {
  require('./api/mocks');
}

ReactDom.render(<App age={19} name="wjx" />, document.querySelector('#root'));
