import React, { Component, PropTypes } from 'react'
import { advanceAWord } from 'src/actions'
import defer from 'lodash.defer'

const SPACEBAR_KEY_CODE = 32

export default class TypingBox extends Component {
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

    this.props.dispatch(advanceAWord())

    this._clearInput(target)
  }

  render () {
    return (
      <input type='text' autoFocus onKeyDown={this.onKeyDown}/>
    )
  }

}

TypingBox.propTypes = {
  dispatch : PropTypes.func.isRequired
}
