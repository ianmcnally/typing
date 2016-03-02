/* eslint-disable react/no-multi-comp */
import React from 'react'
import * as AppPropTypes from 'src/prop-types'
import { connect, Provider } from 'react-redux'
import { Words, TypingBox } from 'src/components'
import createNewStore from 'src/store'

export const App = ({ words }) => (
  <section>
    <Words words={words} />
    <TypingBox />
  </section>
)

App.propTypes = {
  words : AppPropTypes.words.isRequired
}

const mapStateToProps = ({ words }) => ({ words })

const ConnectedApp = connect(mapStateToProps)(App)

export default () => (
  <Provider store={createNewStore()}>
    <ConnectedApp />
  </Provider>
)

