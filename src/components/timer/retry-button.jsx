import React, { PropTypes } from 'react'

const RetryButton = ({ onClick }) => (
  <button onClick={onClick}>Retry</button>
)

RetryButton.propTypes = {
  onClick: PropTypes.func.isRequired
}

export default RetryButton
