import { fetch } from 'src/fetch'
import { WORDS_FETCHED } from 'src/action-types'
import { WORD_API_URL } from 'src/constants'

const wordsFetched = words => ({
  type: WORDS_FETCHED,
  words
})

export const getWords = () =>
  dispatch =>
    fetch(WORD_API_URL)
      .then(response => response.json())
      .then(words => words.map(({ word }) => word))
      .then(words => dispatch(wordsFetched(words)))
