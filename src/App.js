import React from 'react';
import { HashRouter } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'//renderRoutes 读取路由配置转化为 Route 标签

import routes from './routes/index.js';
import { GlobalStyle } from './style'
import { FontStyle } from './assets/webfont/webfont'
import { IconStyle } from './assets/iconfont/iconfont'

import { Data } from './application/Singers/data';

import store from './store/index'
import { Provider } from 'react-redux';

function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <GlobalStyle />
        <FontStyle />
        <IconStyle />
        <Data>
          {renderRoutes(routes)}
        </Data>
      </HashRouter>
    </Provider>

  );
}

export default App
