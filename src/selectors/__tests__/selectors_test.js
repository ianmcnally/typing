import { roundScore } from '../'
import { expect } from 'chai'

describe('selectors', () => {

  describe('roundScore', () => {

    context('with no graded submissions', () => {
      const state = {}
      let output

      before(() => {
        output = roundScore(state)
      })

      it('returns 0s for correct and incorrect scores', () => {
        expect(output).to.eql({ correct: 0, incorrect: 0 })
      })

    })

    context('with an empty set of submissions', () => {
      const state = { submittedWords: [] }
      let output

      before(() => {
        output = roundScore(state)
      })

      it('returns 0s for correct and incorrect scores', () => {
        expect(output).to.eql({ correct: 0, incorrect: 0 })
      })

    })

    context('with all correct submissions', () => {
      const state = {
        submittedWords: [
          { value: 'thing', isCorrect: true },
          { value: 'place', isCorrect: true }
        ]
      }

      let output

      before(() => {
        output = roundScore(state)
      })

      it('returns the correct count and 0 for incorrect', () => {
        expect(output).to.eql({ correct: 2, incorrect: 0 })
      })

    })

    context('with all incorrect submissions', () => {
      const state = {
        submittedWords: [
          { value: 'thing', isCorrect: false },
          { value: 'place', isCorrect: false }
        ]
      }

      let output

      before(() => {
        output = roundScore(state)
      })

      it('returns the incorrect count and 0 for correct', () => {
        expect(output).to.eql({ correct: 0, incorrect: 2 })
      })

    })

    context('with some correct and some incorrect submissions', () => {
      const state = {
        submittedWords: [
          { value: 'thing', isCorrect: true },
          { value: 'person', isCorrect: true },
          { value: 'place', isCorrect: false }
        ]
      }

      let output

      before(() => {
        output = roundScore(state)
      })

      it('returns the right grades', () => {
        expect(output).to.eql({ correct: 2, incorrect: 1 })
      })

    })

  })

})
