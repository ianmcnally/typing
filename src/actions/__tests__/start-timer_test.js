import * as timerActions from '../start-timer'
import * as scheduler from 'src/lib/scheduler'
import { spy, stub } from 'sinon'
import range from 'lodash.range'
import {
  ROUND_STARTED,
  ROUND_ENDED,
  TIME_ADVANCED
} from 'src/action-types'
import { ROUND_DURATION } from 'src/constants'
import { expect } from 'chai'
import { TestScheduler } from 'rx'

describe('startTimer action', () => {

  context('before it starts the sequence', () => {
    const dispatch = spy()

    before(() => {
      const testScheduler = new TestScheduler()

      stub(scheduler, 'get').returns(testScheduler)

      timerActions.startTimer()(dispatch)
    })

    after(() => {
      scheduler.get.restore()
    })

    it(`dispatches a ${ROUND_STARTED} event`, () => {
      expect(dispatch).to.have.been.calledOnce.calledWith({
        type: ROUND_STARTED
      })
    })

  })

  context('while the sequence is happening', () => {

    context('and the round has not been canceled', () => {
      const dispatch = spy()
      const getState = () => ({ round: { started: true, ended: false } })
      let subscription
      let testScheduler

      before(() => {
        testScheduler = new TestScheduler()

        stub(scheduler, 'get').returns(testScheduler)

        subscription = timerActions.startTimer()(dispatch, getState)

        spy(subscription, 'dispose')
      })

      after(() => {
        scheduler.get.restore()
      })

      it(`dispatches ${TIME_ADVANCED} with the remaining time over the sequence`, () => {
        const durationToZero = range(ROUND_DURATION - 1, -1, 1)

        durationToZero.map((timeRemaining, idx) => {
          testScheduler.advanceBy((idx + 1) * 1000)

          expect(dispatch).to.have.been.calledWith({
            type: TIME_ADVANCED,
            timeRemaining
          })

          expect(subscription.dispose).not.to.have.been.called

        })
      })

    })

    context('and the round has been canceled', () => {
      const dispatch = spy()
      const getState = () => ({ round: { started: false, ended: false } })
      let subscription

      before(() => {
        const testScheduler = new TestScheduler()

        stub(scheduler, 'get').returns(testScheduler)

        subscription = timerActions.startTimer()(dispatch, getState)

        spy(subscription, 'dispose')

        dispatch.reset()

        testScheduler.advanceBy(1000)
      })

      after(() => {
        scheduler.get.restore()
      })

      it('does not dispatch time remaining', () => {
        expect(dispatch).not.to.have.been.called
      })

      it('disposes of the subscription', () => {
        expect(subscription.dispose).to.have.been.called
      })

    })

  })

  context('when the sequence has ended', () => {
    const dispatch = spy()
    const getState = () => ({ round: { started: false, ended: true } })

    before(() => {
      const testScheduler = new TestScheduler()

      stub(scheduler, 'get').returns(testScheduler)

      timerActions.startTimer()(dispatch, getState)

      testScheduler.advanceBy((ROUND_DURATION - 1) * 1000)

      expect(dispatch).not.to.have.been.calledWith({
        type: ROUND_ENDED
      })

      testScheduler.advanceBy(ROUND_DURATION * 1000)
    })

    after(() => {
      scheduler.get.restore()
    })

    it(`dispatches ${ROUND_ENDED} when the sequence is complete`, () => {
      expect(dispatch).to.have.been.calledWith({
        type: ROUND_ENDED
      })
    })

  })

})
