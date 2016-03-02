import React, { Component } from 'react'
import defer from 'lodash.defer'

const SPACEBAR_KEY_CODE = 32

export default class TypingBox extends Component {
  constructor (props) {
    super(props)

    this.onKeyDown = this.onKeyDown.bind(this)
  }

  onKeyDown (event) {
    const { keyCode, target } = event

    if (keyCode !== SPACEBAR_KEY_CODE)
      return

    defer(() => target.value = '')
  }

  render () {
    return (
      <input type='text' autoFocus onKeyDown={this.onKeyDown}/>
    )
  }

}
