import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import "./style/app.css"
import "./style/indeed.css"
import "./style/admin.css"

import 'antd/dist/antd.css';
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, } from '@apollo/client'
import { BrowserRouter as Router } from 'react-router-dom'
import Context from './components/Provider/Context'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { RootReducer } from './Redux/Provider'

const httpLink = new HttpLink({
  uri: 'http://localhost:5000/graphql', credentials: 'include',
})


const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  credentials: 'include',
})


const store = createStore(RootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())


ReactDOM.render(
  <React.Fragment>
    <Provider store={store} >
      <Router>
        <ApolloProvider client={client} >
          <Context>
            <App />
          </Context>
        </ApolloProvider>
      </Router>
    </Provider>
  </React.Fragment>,
  document.getElementById('root')
);

