import React from 'react';
import ReactDOM from 'react-dom';
import 'es6-promise/auto';
import 'isomorphic-fetch';
import { AppContainer } from 'react-hot-loader';
import { BrowserRouter } from 'react-router-dom';
import Main from './components/Main';

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <BrowserRouter>
        <Component />
      </BrowserRouter>
    </AppContainer>,
    document.getElementById('root'),
  );
};

render(Main);

// webpack Hot Module Replacement API
if (module.hot) {
  // keep in mind - here you are configuring HMR to accept CHILDREN MODULE
  // while `hot` would configure HMR for the CURRENT module
  module.hot.accept('./components/Main.js', () => {
    // if you are using harmony modules ({modules:false})
    const NextMain = require('./components/Main').default;
    // in all other cases - re-require App manually
    render(NextMain);
  });
  // UNCOMMENT BOTTOM TO CLEAR OUT CHROME DEV TOOLS CONSOLE UPON HOT RELOAD
  // module.hot.addStatusHandler(status => {
  //   if (status === 'prepare') console.clear()
  // })
}
