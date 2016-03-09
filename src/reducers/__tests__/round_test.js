import { RETRY, ROUND_ENDED, ROUND_STARTED } from 'src/action-types'
import { createNewStore } from 'src/store'
import { expect } from 'chai'

describe('round reducer', () => {

  context(`when ${ROUND_STARTED} is dispatched`, () => {
    let state

    before(() => {
      const store = createNewStore()
      store.dispatch({
        type: ROUND_STARTED
      })

      state = store.getState().round
    })

    it('returns the state with started=true', () => {
      expect(state).to.contain({ started: true })
    })

    it('returns the state with ended=false', () => {
      expect(state).to.contain({ ended: false })
    })

  })

  context(`when ${ROUND_ENDED} is dispatched`, () => {
    let state

    before(() => {
      const store = createNewStore()
      store.dispatch({
        type: ROUND_ENDED
      })

      state = store.getState().round
    })

    it('returns the state with started=false', () => {
      expect(state).to.contain({ started: false })
    })

    it('returns the state with ended=true', () => {
      expect(state).to.contain({ ended: true })
    })

  })

  context(`when ${RETRY} is dispatched`, () => {
    const round = { started: true, ended: true }
    let state

    before(() => {
      const store = createNewStore({ round })

      store.dispatch({
        type: RETRY
      })

      state = store.getState().round
    })

    it('returns the state with started=false and ended=false', () => {
      expect(state).to.contain({
        started: false,
        ended: false
      })
    })

  })

  context('when an unhandled action is dispatched', () => {
    const currentState = { started: true }
    let state

    before(() => {
      const store = createNewStore({ round: currentState })
      store.dispatch({
        type: '___ZZZ_NOT_AN_ACTION'
      })

      state = store.getState().round
    })

    it('returns the current state', () => {
      expect(state).to.equal(currentState)
    })

  })

  context('when there is no state', () => {
    let state

    before(() => {
      const store = createNewStore()

      state = store.getState().round
    })

    it('returns an initial state', () => {
      expect(state).to.eql({ started: false, ended: false })
    })

  })

})
