import React, { Component, PropTypes } from 'react'
import { retrying, roundJustStarted } from 'src/selectors'
import { advanceWord } from 'src/actions/advance-word'
import { SPACEBAR_KEY_CODE } from 'src/constants'
import * as AppPropTypes from 'src/prop-types'
import defer from 'lodash.defer'
import styles from './typing-box.css'

export default class TypingBox extends Component {
  constructor (props) {
    super(props)

    this.onKeyDown = this.onKeyDown.bind(this)
  }

  componentDidUpdate (prevProps) {
    const justStartedRound = roundJustStarted(prevProps, this.props)
    const isRetrying = retrying(prevProps, this.props)

    if (justStartedRound || isRetrying)
      this.refs.input.focus()
  }

  _clearInput (input) {
    defer(() => {
      input.value = ''
    })
  }

  onKeyDown (event) {
    const { keyCode, target } = event

    if (keyCode !== SPACEBAR_KEY_CODE)
      return

    this.props.dispatch(advanceWord(target.value))

    this._clearInput(target)
  }

  render () {
    const { disabled } = this.props

    return (
      <input
        className={styles.input}
        disabled={disabled}
        type='text'
        autoFocus
        onKeyDown={this.onKeyDown}
        ref='input'
      />
    )
  }

}

TypingBox.propTypes = {
  disabled: PropTypes.bool,
  dispatch: PropTypes.func.isRequired,
  round: AppPropTypes.round.isRequired
}
