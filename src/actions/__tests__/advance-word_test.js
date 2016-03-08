import * as timerActions from '../start-timer'
import { advanceWord } from '../advance-word'
import { spy, stub } from 'sinon'
import {
  SUBMISSION_GRADED
} from 'src/action-types'
import { expect } from 'chai'

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

