/* eslint-disable react/no-multi-comp */
import React, { Component, PropTypes } from 'react'
import { Provider } from 'react-redux'
import { Prompt, Score, Controls } from 'src/components'
import { getWords } from 'src/actions/get-words'
import store from 'src/store'
import 'normalize.css'
import 'src/styles/colors.css'
import styles from './app.css'

export class App extends Component {

  componentWillMount () {
    const { dispatch } = this.props

    dispatch(getWords())
  }

  render () {
    return (
      <section className={styles.app}>
        <Prompt />
        <Controls />
        <Score />
      </section>
    )
  }

}

App.propTypes = {
  dispatch: PropTypes.func.isRequired
}

export default () => (
  <Provider store={store}>
    <App dispatch={store.dispatch} />
  </Provider>
)
