import React from 'react'
import ScoreConnected, { Score } from '../score'
import { renderShallow } from 'lib/test-helpers'
import { createNewStore } from 'src/store'
import { expect } from 'chai'

describe('<Score>', () => {

  context('when the round has not ended', () => {
    const round = { started: true, ended: false }
    let component

    before(() => {
      component = renderShallow(<Score round={round} />).output
    })

    it('renders an empty span', () => {
      expect(component).to.eql(<span />)
    })

  })

  context('when the round has ended', () => {
    const round = { started: true, ended: true }
    let component

    before(() => {
      component = renderShallow(<Score round={round} />).output
    })

    it('displays the score', () => {
      expect(component).to.eql(<p>The score</p>)
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

