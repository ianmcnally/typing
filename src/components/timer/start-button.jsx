import React, { PropTypes } from 'react'
import cx from 'classnames'
import stateStyles from 'src/styles/states.css'

const StartButton = ({ disabled, onClick }) => {
  const buttonClasses = cx({
    [stateStyles['is-disabled']]: disabled
  })

  return (
    <button className={buttonClasses} disabled={disabled} onClick={onClick}>Start</button>
  )
}

StartButton.propTypes = {
  disabled: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
}

export default StartButton

