import { ADVANCE_A_WORD } from 'src/action-types'
import { createNewStore } from 'src/store'
import { expect } from 'chai'

describe('currentWord', () => {

  context('when there is state', () => {

    context(`and the action is ${ADVANCE_A_WORD}`, () => {
      const initialState = 100
      const store = createNewStore({ currentWord: initialState })
      let state

      before(() => {
        store.dispatch({ type: ADVANCE_A_WORD })
        state = store.getState().currentWord
      })

      it('increases state by one', () => {
        expect(state).to.eql(initialState + 1)
      })

    })

    context('and action is unhandled', () => {
      const initialState = 100
      const store = createNewStore({ currentWord: initialState })
      let state

      before(() => {
        store.dispatch({ type: '__ZZZ__NOT_AN_ACTION__' })
        state = store.getState().currentWord
      })

      it('returns the state unchanged', () => {
        expect(state).to.eql(initialState)
      })

    })

  })

  context('when there is no state', () => {

    context('and the action is ADVANCE_A_WORD', () => {
      const store = createNewStore({})
      let state

      before(() => {
        store.dispatch({ type: ADVANCE_A_WORD })
        state = store.getState().currentWord
      })

      it('returns a state of 1', () => {
        expect(state).to.eql(1)
      })

    })

    context('and the action is unhandled', () => {
      const store = createNewStore({})
      let state

      before(() => {
        store.dispatch({ type: '__ZZZ__NOT_AN_ACTION__' })
        state = store.getState().currentWord
      })

      it('returns a state of 0', () => {
        expect(state).to.eql(0)
      })

    })

  })

})
