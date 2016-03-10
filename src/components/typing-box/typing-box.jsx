import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { advanceWord } from 'src/actions/advance-word'
import { SPACEBAR_KEY_CODE } from 'src/constants'
import * as AppPropTypes from 'src/prop-types'
import defer from 'lodash.defer'
import styles from './typing-box.css'

export class TypingBox extends Component {
  constructor (props) {
    super(props)

    this.onKeyDown = this.onKeyDown.bind(this)
  }

  componentDidUpdate (prevProps) {
    const roundJustStarted = !prevProps.round.started && this.props.round.started
    const retrying = prevProps.round.ended && !this.props.round.ended

    if (roundJustStarted || retrying)
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
    return (
      <input className={styles.input} type='text' autoFocus onKeyDown={this.onKeyDown} ref='input' />
    )
  }

}

TypingBox.propTypes = {
  dispatch: PropTypes.func.isRequired,
  round: AppPropTypes.round.isRequired
}

const mapStateToProps = ({ round }) => ({ round })

export default connect(mapStateToProps)(TypingBox)

