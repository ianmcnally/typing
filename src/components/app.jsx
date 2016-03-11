/* eslint-disable react/no-multi-comp */
import React from 'react'
import { Provider } from 'react-redux'
import { Prompt, Score, Controls } from 'src/components'
import store from 'src/store'
import 'normalize.css'
import 'src/styles/colors.css'
import styles from './app.css'

export const App = () => (
  <section className={styles.app}>
    <Prompt />
    <Controls />
    <Score />
  </section>
)

export default () => (
  <Provider store={store}>
    <App />
  </Provider>
)

