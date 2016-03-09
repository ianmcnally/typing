import React from 'react'
import { renderShallow } from 'lib/test-helpers'
import Word from '../word'
import { expect } from 'chai'

describe('<Word>', () => {

  context('when it is rendered', () => {
    const value = 'Eyyo'
    let component

    before(() => {
      const { output } = renderShallow(<Word value={value} />)
      component = output
    })

    it('renders props.value as text wrapped in a span', () => {
      expect(component).to.eql(<span className='word__word'>{value}</span>)
    })

  })

  context('when there is a submission for the word', () => {

    context('and it is graded correct', () => {
      const value = 'Eyyo'
      const submission = { value: 'Eyyo', isCorrect: true }
      let component

      before(() => {
        const { output } = renderShallow(<Word value={value} submission={submission} />)
        component = output
      })

      it('has a className to reflect its correctness', () => {
        expect(component).to.eql(
          <span className='word__word word__correct-word colors__color--correct'>{value}</span>
        )
      })

    })

    context('and it is graded incorrectly', () => {
      const value = 'Eyyo'
      const submission = { value: 'Ey', isCorrect: false }
      let component

      before(() => {
        const { output } = renderShallow(<Word value={value} submission={submission} />)
        component = output
      })

      it('has a className to reflect its incorrectness', () => {
        expect(component).to.eql(
          <span className='word__word word__incorrect-word colors__color--incorrect'>{value}</span>
        )
      })

    })

  })

})

