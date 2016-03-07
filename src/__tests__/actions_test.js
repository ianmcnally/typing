import { advanceAWord, startTimer } from '../actions'
import * as scheduler from 'src/lib/scheduler'
import { spy, stub } from 'sinon'
import range from 'lodash.range'
import {
  SUBMISSION_GRADED,
  ROUND_ENDED,
  TIME_ADVANCED
} from '../action-types'
import { expect } from 'chai'
import { TestScheduler } from 'rx'

describe('action creators', () => {

  describe('advanceAWord', () => {

    context('when a word can be submitted', () => {

      context('and the submission is correct', () => {
        const dispatch = spy()
        const getState = () => ({
          submittedWords: ['a'],
          words: ['a', 'b']
        })
        const submittedValue = 'b'

        before(() => {
          advanceAWord(submittedValue)(dispatch, getState)
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
          words: ['a', 'b']
        })
        const submittedValue = 'not-b'

        before(() => {
          advanceAWord(submittedValue)(dispatch, getState)
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
        words: ['a', 'b']
      })
      const submittedValue = 'c'

      before(() => {
        advanceAWord(submittedValue)(dispatch, getState)
      })

      it('does not dispatch an action', () => {
        expect(dispatch).not.to.have.been.called
      })

    })

  })

  describe('startTimer', () => {
    context('while the sequence is happening', () => {
      const dispatch = spy()
      let testScheduler

      before(() => {
        testScheduler = new TestScheduler()

        stub(scheduler, 'get').returns(testScheduler)

        startTimer()(dispatch)
      })

      after(() => {
        scheduler.get.restore()
      })

      it(`dispatches ${TIME_ADVANCED} with the remaining time over the sequence`, () => {
        const sixtyToZero = range(60, -1, -1)

        sixtyToZero.map((timeRemaining, idx) => {
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

        startTimer()(dispatch)

        testScheduler.advanceBy(60 * 1000)

        expect(dispatch).not.to.have.been.calledWith({
          type: ROUND_ENDED
        })

        testScheduler.advanceBy(61 * 1000)
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
