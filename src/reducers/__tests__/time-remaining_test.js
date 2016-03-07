import { createNewStore } from 'src/store'
import { TIME_ADVANCED, ROUND_ENDED } from 'src/action-types'
import { expect } from 'chai'

describe('timeRemaining reducer', () => {

  context('when there is no previous state', () => {
    let state

    before(() => {
      const store = createNewStore()

      state = store.getState().timeRemaining
    })

    it('defaults to 60', () => {
      expect(state).to.equal(60)
    })

  })

  context(`when ${TIME_ADVANCED} is dispatched`, () => {
    const timeRemaining = 59
    let state

    before(() => {
      const store = createNewStore()

      store.dispatch({
        type: TIME_ADVANCED,
        timeRemaining
      })

      state = store.getState().timeRemaining
    })

    it('the state is action.timeRemaining', () => {
      expect(state).to.eql(timeRemaining)
    })

  })

  context(`when ${ROUND_ENDED} is dispatched`, () => {
    let state

    before(() => {
      const store = createNewStore()

      store.dispatch({
        type: ROUND_ENDED
      })

      state = store.getState().timeRemaining
    })

    it('the state is zero', () => {
      expect(state).to.equal(0)
    })

  })

  context('when an unhandled action is dispatched', () => {
    const currentState = 10
    let state

    before(() => {
      const store = createNewStore({ timeRemaining: currentState })

      store.dispatch({
        type: '___ZZZ__NOT_AN_ACTION___'
      })

      state = store.getState().timeRemaining
    })

    it('the state is the current state', () => {
      expect(state).to.equal(currentState)
    })

  })

})
