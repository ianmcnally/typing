import { App, Words, Word } from 'src/app'
import renderShallow from 'src/test-helpers/lib/render-shallow'
import React from 'react'
import { expect } from 'chai'

describe('App', () => {

  describe('<App>', () => {
    let component

    before(() => {
      const { output } = renderShallow(<App />)
      component = output
    })

    it('renders <Words> with a list of words', () => {
      expect(component).to.include(
        <Words words={['a', 'bee']} />
      )
    })

  })

  describe('<Words>', () => {
    const words = ['hey', 'ian']
    let component

    before(() => {
      const { output } = renderShallow(<Words words={words} />)
      component = output
    })

    it('renders a <Word> for every props.words', () => {
      words.forEach((word, index) => {
        expect(component).to.include(<Word value={word} index={index} />)
      })
    })

    it('has a container of type <article>', () => {
      expect(component.type).to.equal('article')
    })

  })

  describe('<Word>', () => {
    const value = 'Ey there Charlie boy'
    let component

    before(() => {
      const { output } = renderShallow(<Word value={value} />)
      component = output
    })

    it('renders props.value as text wrapped in a span', () => {
      expect(component).to.eql(<span>{value}</span>)
    })

  })

})

