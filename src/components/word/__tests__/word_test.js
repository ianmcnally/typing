import React from 'react'
import { renderShallow } from 'lib/test-helpers'
import Word from '../word'
import cx from 'classnames'
import styles from '../word.css'
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
      expect(component).to.eql(<span className={styles.word}>{value}</span>)
    })

  })

  context('when there is a submission for the word', () => {

    context('and it is graded correct', () => {
      const value = 'Eyyo'
      const submission = { value: 'Eyyo', isCorrect: true }
      const expectedClassName = cx(styles.word, styles.correctWord)
      let component

      before(() => {
        const { output } = renderShallow(<Word value={value} submission={submission} />)
        component = output
      })

      it('has a className to reflect its correctness', () => {

        expect(component).to.eql(
          <span className={expectedClassName}>{value}</span>
        )
      })

    })

    context('and it is graded incorrectly', () => {
      const value = 'Eyyo'
      const submission = { value: 'Ey', isCorrect: false }
      const expectedClassName = cx(styles.word, styles.incorrectWord)
      let component

      before(() => {
        const { output } = renderShallow(<Word value={value} submission={submission} />)
        component = output
      })

      it('has a className to reflect its incorrectness', () => {
        expect(component).to.eql(
          <span className={expectedClassName}>{value}</span>
        )
      })

    })

  })

})

