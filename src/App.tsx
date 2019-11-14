import React from 'react';
import { Provider } from 'react-redux'
import store from './store'
import Layout from './layout'
import './styles/index.less'


function App () {
  return (<Provider store={store}>
            <Layout></Layout>
          </Provider>)
}

export default App;
