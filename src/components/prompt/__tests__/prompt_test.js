import React from 'react'
import PromptConnected, { Prompt } from '../prompt'
import styles from '../prompt.css'
import { Word } from 'src/components'
import { renderShallow } from 'lib/test-helpers'
import { createNewStore } from 'src/store'
import { expect } from 'chai'

describe('<Prompt>', () => {

  context('when it is rendered', () => {
    const words = ['hey', 'ian']
    const submittedWords = [{ value: 'hey', isCorrect: true }]
    let component

    before(() => {
      const { output } = renderShallow(<Prompt words={words} submittedWords={submittedWords} />)
      component = output
    })

    it('renders a <Word> for every props.words', () => {
      words.forEach((word, index) => {
        const submission = submittedWords[index]
        expect(component).to.include(<Word value={word} submission={submission} />)
      })
    })

    it('has a container of type <article>', () => {
      expect(component.type).to.equal('article')
    })

    it('has the correct className applied', () => {
      expect(component.props.className).to.eql(styles.prompt)
    })

  })

  context('when it is connected', () => {
    const words = ['hey', 'ian']
    const submittedWords = [{ value: 'hey', isCorrect: true }]
    let component

    before(() => {
      const store = createNewStore({ words, submittedWords })
      const { output } = renderShallow(<PromptConnected store={store} />)
      component = output
    })

    it('renders <Prompt>', () => {
      expect(component.type).to.equal(Prompt)
    })

    it('renders with state.words', () => {
      expect(component.props.words).to.eql(words)
    })

    it('renders with state.submittedWords', () => {
      expect(component.props.submittedWords).to.eql(submittedWords)
    })
  })

})

