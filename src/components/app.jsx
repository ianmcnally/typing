/* eslint-disable react/no-multi-comp */
import React from 'react'
import { Provider } from 'react-redux'
import { Words, TypingBox } from 'src/components'
import store from 'src/store'

export const App = () => (
  <section>
    <Words />
    <TypingBox />
  </section>
)

export default () => (
  <Provider store={store}>
    <App />
  </Provider>
)

