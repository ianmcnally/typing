import { advanceAWord } from '../actions'
import { spy } from 'sinon'
import { SUBMISSION_GRADED } from '../action-types'
import { expect } from 'chai'

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

})
