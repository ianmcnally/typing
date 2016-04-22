import { createNewStore } from 'src/store'
import { WORDS_FETCHED } from 'src/action-types'
import { expect } from 'chai'

describe('words reducer', () => {

  context(`when ${WORDS_FETCHED} is dispatched`, () => {
    const words = ['hello']
    let state

    before(() => {
      const store = createNewStore()

      store.dispatch({
        type: WORDS_FETCHED,
        words
      })

      state = store.getState().words
    })

    it('returns a new state from action.words', () => {
      expect(state).to.eql(words)
    })

  })

  context('when an unhandled action is dispatched', () => {

    context('with an existing state', () => {
      const words = ['hello']
      let state

      before(() => {
        const store = createNewStore({ words })

        store.dispatch({
          type: '___ZZZ_NOT_AN_ACTION___'
        })

        state = store.getState().words
      })

      it('returns the existing state', () => {
        expect(state).to.equal(words)
      })

    })

    context('without an existing state', () => {
      let state

      before(() => {
        const store = createNewStore()

        store.dispatch({
          type: '___ZZZ_NOT_AN_ACTION___'
        })

        state = store.getState().words
      })

      it('returns an empty state', () => {
        expect(state).to.eql([])
      })

    })

  })

})
