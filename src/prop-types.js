import { PropTypes } from 'react'

export const timeRemaining = PropTypes.number

export const word = PropTypes.string

export const words = PropTypes.arrayOf(word)

export const submittedWord = PropTypes.shape({
  value: PropTypes.string.isRequired,
  isCorrect: PropTypes.bool.isRequired
})

export const submittedWords = PropTypes.arrayOf(submittedWord)

