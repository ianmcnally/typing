import { createNewStore } from 'src/store'
import { RETRY, SUBMISSION_GRADED } from 'src/action-types'
import { expect } from 'chai'

describe('submittedWords reducer', () => {

  context(`when ${SUBMISSION_GRADED} is dispatched`, () => {
    const submission = {
      value: 'someword',
      isCorrect: true
    }

    let state

    before(() => {
      const store = createNewStore({ submittedWords: [] })

      store.dispatch({
        type: SUBMISSION_GRADED,
        submission
      })

      state = store.getState().submittedWords
    })

    it('adds the action.submission to the state', () => {
      expect(state).to.contain(submission)
    })

  })

  context(`when ${RETRY} is dispatched`, () => {
    const submittedWords = [{
      value: 'someword',
      isCorrect: true
    }]
    let state

    before(() => {
      const store = createNewStore({ submittedWords })

      store.dispatch({ type: RETRY })

      state = store.getState().submittedWords
    })

    it('clears the submitted words', () => {
      expect(state).to.eql([])
    })

  })

  context('when an unhandled action is dispatched', () => {
    const submittedWords = [{
      value: 'someword',
      isCorrect: true
    }]

    let state

    before(() => {
      const store = createNewStore({ submittedWords })

      store.dispatch({
        type: '___ZZZ_NOT_AN_ACTION___'
      })

      state = store.getState().submittedWords
    })

    it('returns the current state', () => {
      expect(state).to.equal(submittedWords)
    })

  })

  context('when there are no submitted words', () => {
    let state

    before(() => {
      const store = createNewStore()

      store.dispatch({
        type: '___ZZZ_NOT_AN_ACTION___'
      })

      state = store.getState().submittedWords
    })

    it('returns an empty state', () => {
      expect(state).to.eql([])
    })

  })

})
