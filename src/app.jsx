/* eslint-disable react/no-multi-comp */
import React from 'react'
import * as AppPropTypes from 'src/prop-types'
import { connect, Provider } from 'react-redux'
import createNewStore from 'src/store'
import map from 'lodash.map'

export const Word = ({ value }) => (
  <span>{value}</span>
)

Word.propTypes = {
  value : AppPropTypes.word
}

export const Words = ({ words }) => (
  <article>
    {map(words, (word, idx) => (
    <Word value={word} index={idx} key={idx} />
    ))}
  </article>
)

Words.propTypes = {
  words : AppPropTypes.words
}

export const App = ({ words }) => (
  <section>
    <Words words={words} />
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

