import React from 'react'
import WordsConnected, { Words } from '../words'
import { Word } from 'src/components'
import { renderShallow } from 'src/test-helpers/lib'
import { createNewStore } from 'src/store'
import { expect } from 'chai'

describe('<Words>', () => {

  context('when it is rendered', () => {
    const words = ['hey', 'ian']
    const submittedWords = [{ value: 'hey', isCorrect: true }]
    let component

    before(() => {
      const { output } = renderShallow(<Words words={words} submittedWords={submittedWords} />)
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

  })

  context('when it is connected', () => {
    const words = ['hey', 'ian']
    const submittedWords = [{ value: 'hey', isCorrect: true }]
    let component

    before(() => {
      const store = createNewStore({ words, submittedWords })
      const { output } = renderShallow(<WordsConnected store={store} />)
      component = output
    })

    it('renders <Words>', () => {
      expect(component.type).to.equal(Words)
    })

    it('renders with state.words', () => {
      expect(component.props.words).to.eql(words)
    })

    it('renders with state.submittedWords', () => {
      expect(component.props.submittedWords).to.eql(submittedWords)
    })
  })

})

