import React from 'react';
import ReactDom from 'react-dom';
import App from './app';

ReactDom.render(<App age={19} name="wjx" />, document.querySelector('#root'));
