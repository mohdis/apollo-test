import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloProvider, ApolloClient } from '@apollo/client'

import cache from './apollo/cache'

import './index.css'
import App from './App'

const apolloClient = new ApolloClient({
  uri: 'https://sxewr.sse.codesandbox.io/',
  cache,
})

ReactDOM.render(
  <ApolloProvider client={apolloClient}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
)
