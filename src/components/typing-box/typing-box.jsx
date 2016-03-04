import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { advanceAWord } from 'src/actions'
import { SPACEBAR_KEY_CODE } from 'src/constants'
import defer from 'lodash.defer'
import styles from './typing-box.css'

export class TypingBox extends Component {
  constructor (props) {
    super(props)

    this.onKeyDown = this.onKeyDown.bind(this)
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

    this.props.dispatch(advanceAWord(target.value))

    this._clearInput(target)
  }

  render () {
    return (
      <input className={styles.input} type='text' autoFocus onKeyDown={this.onKeyDown}/>
    )
  }

}

TypingBox.propTypes = {
  dispatch: PropTypes.func.isRequired
}

export default connect()(TypingBox)

