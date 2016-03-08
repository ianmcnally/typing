import React, { PropTypes } from 'react'

const StartButton = ({ disabled, onClick }) => (
  <button disabled={disabled} onClick={onClick}>Start</button>
)

StartButton.propTypes = {
  disabled: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
}

export default StartButton

