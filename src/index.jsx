// npm libs
import React from 'react';
import ReactDOM from 'react-dom';

// containers
import Root from 'pages';

// theme
import { createPlainStylesObject } from 'styles';
import 'styles/mainTheme';

// services
import 'services/tracking';
import { initConnection } from 'services/firebase';

const styles = createPlainStylesObject(() => ({
  'background-color': 'white',
  display: 'flex',
  flex: 1,
  height: '100vh',
}));

const target = document.createElement('main');
target.setAttribute(
  'style',
  Object.keys(styles)
    .map(key => `${key}:${styles[key]}`)
    .join(';')
);

initConnection();
document.body.appendChild(target);
ReactDOM.render(<Root />, target);

if (module.hot) {
  module.hot.accept('./pages/index.jsx', () => {
    // eslint-disable-next-line
    const NextApp = require('./pages/index.jsx').default;
    ReactDOM.render(<NextApp />, target);
  });
}
