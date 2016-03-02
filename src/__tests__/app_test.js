import { App } from 'src/app'
import { Words, TypingBox } from 'src/components'
import { renderShallow } from 'src/test-helpers/lib'
import React from 'react'
import { expect } from 'chai'

describe('App', () => {

  describe('<App>', () => {
    const words = ['Charles', 'in', 'Charge']
    let component

    before(() => {
      const { output } = renderShallow(<App words={words} />)
      component = output
    })

    it('renders <Words> with a list of props.words', () => {
      expect(component).to.include(
        <Words words={words} />
      )
    })

    it('renders the typing box', () => {
      expect(component).to.include(
        <TypingBox />
      )
    })

  })

})

