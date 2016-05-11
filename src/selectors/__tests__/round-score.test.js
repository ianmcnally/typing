import test from 'ava'
import { roundScore } from '../'

test('roundScore - with no graded submissions, it returns 0s for correct, incorrect and wpm scores', t => {
  const state = {}
  const output = roundScore(state)

  t.deepEqual(output, { correct: 0, incorrect: 0, wpm: 0 })
})

test('roundScore - with an empty set of submissions, returns 0s for correct, incorrect and wpm scores', t => {
  const state = { submittedWords: [] }
  const output = roundScore(state)

  t.deepEqual(output, { correct: 0, incorrect: 0, wpm: 0 })
})

test('roundScore - with all correct submissions returns the correct count, 0 for incorrect, and wpm count', t => {
  const state = {
    submittedWords: [
      { value: 'thing', isCorrect: true },
      { value: 'place', isCorrect: true }
    ]
  }
  const output = roundScore(state)

  t.deepEqual(output, { correct: 2, incorrect: 0, wpm: 2 })
})

test('roundScore - with all incorrect submissions returns the incorrect count and 0 for correct and wpm', t => {
  const state = {
    submittedWords: [
      { value: 'thing', isCorrect: false },
      { value: 'place', isCorrect: false }
    ]
  }
  const output = roundScore(state)

  t.deepEqual(output, { correct: 0, incorrect: 2, wpm: 0 })
})

test('roundScore - with some correct and some incorrect submissions, returns the right grades', t => {
  const state = {
    submittedWords: [
      { value: 'thing', isCorrect: true },
      { value: 'person', isCorrect: true },
      { value: 'place', isCorrect: false }
    ]
  }
  const output = roundScore(state)

  t.deepEqual(output, { correct: 2, incorrect: 1, wpm: 2 })
})
