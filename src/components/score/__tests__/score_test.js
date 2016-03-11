import React from 'react'
import ScoreConnected, { Score } from '../score'
import styles from '../score.css'
import { renderShallow } from 'lib/test-helpers'
import { createNewStore } from 'src/store'
import { expect } from 'chai'

describe('<Score>', () => {

  context('when the round has not ended', () => {
    const round = { started: true, ended: false }
    const scores = { correct: 0, incorrect: 0 }
    let component

    before(() => {
      component = renderShallow(<Score round={round} scores={scores} />).output
    })

    it('renders null', () => {
      expect(component).to.be.null
    })

  })

  context('when the round has ended', () => {
    const round = { started: true, ended: true }
    const scores = { correct: 1, incorrect: 1 }
    let component

    before(() => {
      component = renderShallow(<Score round={round} scores={scores} />).output
    })

    it('displays the score', () => {
      expect(component).to.eql(
        <article>
          <h3>Your score</h3>
          <p className={styles.correctScore}>Correct: 1</p>
          <p className={styles.incorrectScore}>Incorrect: 1</p>
        </article>
      )
    })

  })

  context('when it is connected', () => {
    const round = { started: true, ended: true }
    const submittedWords = [
      { value: 'a', isCorrect: true },
      { value: 'zzz', isCorrect: false }
    ]
    const store = createNewStore({ round, submittedWords })
    let component

    before(() => {
      component = renderShallow(<ScoreConnected store={store}/>).output
    })

    it('renders <Score>', () => {
      expect(component.type).to.eql(Score)
    })

    it('injects state.round as props.round', () => {
      expect(component.props.round).to.equal(round)
    })

    it('calculates the round score as props.scores', () => {
      expect(component.props.scores).to.be.ok
      expect(component.props.scores).to.eql({
        correct: 1,
        incorrect: 1
      })
    })

  })

})

