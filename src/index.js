import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './static/font/fontello.css';
import GitHub from './components/github';
import Container from './components/container';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <div className="main">
      <GitHub />
      <Container />
    </div>
    , document.getElementById('root'));
registerServiceWorker();
