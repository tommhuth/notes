import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader'; 
import { configureStore, history } from './store/configure-store';
import { Provider } from 'react-redux';
import { Switch, Route } from 'react-router';
import { Link } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import './app.global.css';

const store = configureStore();

render(
  <AppContainer> 
    <Provider store={store}>
        <ConnectedRouter history={history}> 
            <>
                <ul>
                    <li><Link to="/">home</Link></li>
                    <li><Link to="/counter">counter</Link></li>
                </ul>
                <Switch>
                    <Route path={"/counter"} render={() => <div>counter</div>} />
                    <Route path={"/"} render={() => <div>home</div>} />
                </Switch>
            </>
        </ConnectedRouter>
    </Provider>
  </AppContainer>,
  document.getElementById('root')
);

/*
if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    // eslint-disable-next-line global-require
    const NextRoot = require('./containers/Root').default;
    render(
      <AppContainer>
        <NextRoot store={store} history={history} />
      </AppContainer>,
      document.getElementById('root')
    );
  });
}



*/
