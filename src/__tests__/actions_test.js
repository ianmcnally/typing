import * as timerActions from '../actions/start-timer'
import { advanceWord } from '../actions/advance-word'
import * as scheduler from 'src/lib/scheduler'
import { spy, stub } from 'sinon'
import range from 'lodash.range'
import {
  SUBMISSION_GRADED,
  ROUND_STARTED,
  ROUND_ENDED,
  TIME_ADVANCED
} from '../action-types'
import { expect } from 'chai'
import { TestScheduler } from 'rx'

describe('action creators', () => {

  describe('advanceWord', () => {

    context('when a word can be submitted', () => {

      context('and the submission is correct', () => {
        const dispatch = spy()
        const getState = () => ({
          submittedWords: ['a'],
          words: ['a', 'b'],
          round: { started: true }
        })
        const submittedValue = 'b'

        before(() => {
          advanceWord(submittedValue)(dispatch, getState)
        })

        it(`dispatches ${SUBMISSION_GRADED} with the value and isCorrect=true`, () => {
          expect(dispatch).to.have.been.calledWith({
            type: SUBMISSION_GRADED,
            submission: {
              value: submittedValue,
              isCorrect: true
            }
          })
        })

      })

      context('and the submission is incorrect', () => {
        const dispatch = spy()
        const getState = () => ({
          submittedWords: ['a'],
          words: ['a', 'b'],
          round: { started: true }
        })
        const submittedValue = 'not-b'

        before(() => {
          advanceWord(submittedValue)(dispatch, getState)
        })

        it(`dispatches ${SUBMISSION_GRADED} with the value and isCorrect=false`, () => {
          expect(dispatch).to.have.been.calledWith({
            type: SUBMISSION_GRADED,
            submission: {
              value: submittedValue,
              isCorrect: false
            }
          })
        })

      })

    })

    context('when all words have been submitted', () => {
      const dispatch = spy()
      const getState = () => ({
        submittedWords: ['a', 'not-b'],
        words: ['a', 'b'],
        round: { started: true }
      })
      const submittedValue = 'c'

      before(() => {
        advanceWord(submittedValue)(dispatch, getState)
      })

      it('does not dispatch an action', () => {
        expect(dispatch).not.to.have.been.calledWith({
          type: SUBMISSION_GRADED,
          submission: {
            value: submittedValue,
            isCorrect: false
          }
        })
      })

    })

    context('when the round has not started yet', () => {
      const dispatch = spy()
      const getState = () => ({
        round: { started: false },
        words: [],
        submittedWords: []
      })
      const submission = 'zzz'

      before(() => {
        stub(timerActions, 'startTimer').returns({ type: 'OH_YEAH_STARTED_TIMER' })
        advanceWord(submission)(dispatch, getState)
      })

      after(() => {
        timerActions.startTimer.restore()
      })

      it('dispatches startTimer()', () => {
        expect(dispatch).to.have.been.calledWith(timerActions.startTimer())
      })

    })

  })

  describe('startTimer', () => {
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
      const dispatch = spy()
      let testScheduler

      before(() => {
        testScheduler = new TestScheduler()

        stub(scheduler, 'get').returns(testScheduler)

        timerActions.startTimer()(dispatch)
      })

      after(() => {
        scheduler.get.restore()
      })

      it(`dispatches ${TIME_ADVANCED} with the remaining time over the sequence`, () => {
        const fiftyNineToZero = range(59, -1, -1)

        fiftyNineToZero.map((timeRemaining, idx) => {
          testScheduler.advanceBy((idx + 1) * 1000)

          expect(dispatch).to.have.been.calledWith({
            type: TIME_ADVANCED,
            timeRemaining
          })

        })
      })

    })

    context('when the sequence has ended', () => {
      const dispatch = spy()

      before(() => {
        const testScheduler = new TestScheduler()

        stub(scheduler, 'get').returns(testScheduler)

        timerActions.startTimer()(dispatch)

        testScheduler.advanceBy(59 * 1000)

        expect(dispatch).not.to.have.been.calledWith({
          type: ROUND_ENDED
        })

        testScheduler.advanceBy(60 * 1000)
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

})
