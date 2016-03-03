import { createNewStore } from 'src/store'
import { ADVANCE_A_WORD } from 'src/action-types'
import { expect } from 'chai'

describe('submittedWords reducer', () => {

  context(`when ${ADVANCE_A_WORD} is dispatched`, () => {
    const submission = 'heyo'
    let state

    before(() => {
      const store = createNewStore({ submittedWords: [] })

      store.dispatch({
        type: ADVANCE_A_WORD,
        submission
      })

      state = store.getState().submittedWords
    })

    it('adds the action.submission to the state', () => {
      expect(state).to.contain(submission)
    })

  })

  context('when an unhandled action is dispatched', () => {
    const submittedWords = ['sup']
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
