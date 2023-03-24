import { createRoot } from 'react-dom/client';
import './assets/less/index.less';
import App from './app';

if (process.env.MOCK) {
  require('./apis/mocks');
}

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(<App age={19} name="wdjx" />);
