import React from 'react'
import Words from '../words'
import { Word } from 'src/components'
import { renderShallow } from 'src/test-helpers/lib'
import { expect } from 'chai'

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

