import { roundJustStarted, retrying, roundCanceled } from '../round-status'
import { expect } from 'chai'

describe('round status selector', () => {

  describe('roundJustStarted', () => {

    context('when the round has just started', () => {
      const previousState = { round: { started: false } }
      const currentState = { round: { started: true } }
      let output

      before(() => {
        output = roundJustStarted(previousState, currentState)
      })

      it('returns true', () => {
        expect(output).to.be.true
      })

    })

    context('when the round has already started', () => {
      const previousState = { round: { started: true } }
      const currentState = { round: { started: true } }
      let output

      before(() => {
        output = roundJustStarted(previousState, currentState)
      })

      it('returns false', () => {
        expect(output).to.be.false
      })

    })

    context('when the round is over', () => {
      const previousState = { round: { started: true } }
      const currentState = { round: { started: false } }
      let output

      before(() => {
        output = roundJustStarted(previousState, currentState)
      })

      it('returns false', () => {
        expect(output).to.be.false
      })

    })

  })

  describe('retrying', () => {

    context('when the round had started but now has not', () => {
      const previousState = { round: { started: true } }
      const currentState = { round: { started: false } }
      let output

      before(() => {
        output = retrying(previousState, currentState)
      })

      it('returns true', () => {
        expect(output).to.be.true
      })

    })

    context('when the round had ended but now has not', () => {
      const previousState = { round: { ended: true } }
      const currentState = { round: { ended: false } }
      let output

      before(() => {
        output = retrying(previousState, currentState)
      })

      it('returns true', () => {
        expect(output).to.be.true
      })

    })

    context('when the round has started and is still started', () => {
      const previousState = { round: { started: true } }
      const currentState = { round: { started: true } }
      let output

      before(() => {
        output = retrying(previousState, currentState)
      })

      it('returns false', () => {
        expect(output).to.be.false
      })

    })

    context('when the round has not started and still has not started', () => {
      const previousState = { round: { started: false } }
      const currentState = { round: { started: false } }
      let output

      before(() => {
        output = retrying(previousState, currentState)
      })

      it('returns false', () => {
        expect(output).to.be.false
      })

    })

    context('when the round has not ended and still has not ended', () => {
      const previousState = { round: { ended: false } }
      const currentState = { round: { ended: false } }
      let output

      before(() => {
        output = retrying(previousState, currentState)
      })

      it('returns false', () => {
        expect(output).to.be.false
      })

    })

  })

  describe('roundCanceled', () => {

    context('when the round has not started or ended', () => {
      const state = { round: { started: false, ended: false } }
      let output

      before(() => {
        output = roundCanceled(state)
      })

      it('returns true', () => {
        expect(output).to.be.true
      })

    })

    context('when the round has started', () => {
      const state = { round: { started: true, ended: false } }
      let output

      before(() => {
        output = roundCanceled(state)
      })

      it('returns false', () => {
        expect(output).to.be.false
      })

    })

    context('when the round has ended', () => {
      const state = { round: { started: false, ended: true } }
      let output

      before(() => {
        output = roundCanceled(state)
      })

      it('returns false', () => {
        expect(output).to.be.false
      })

    })

    context('when round has started and ended', () => {
      const state = { round: { started: true, ended: true } }
      let output

      before(() => {
        output = roundCanceled(state)
      })

      it('returns false', () => {
        expect(output).to.be.false
      })

    })

  })

})
