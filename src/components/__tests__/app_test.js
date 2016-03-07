import { App } from '../app'
import { Prompt, TypingBox } from 'src/components'
import { renderShallow } from 'src/test-helpers/lib'
import React from 'react'
import { expect } from 'chai'
import { spy } from 'sinon'

describe('App', () => {

  describe('<App>', () => {
    const words = ['Charles', 'in', 'Charge']
    const dispatch = spy()
    let component

    before(() => {
      const { output } = renderShallow(<App words={words} dispatch={dispatch} />)
      component = output
    })

    it('renders <Prompt>', () => {
      expect(component).to.include(
        <Prompt />
      )
    })

    it('renders the typing box', () => {
      expect(component).to.include(
        <TypingBox />
      )
    })

  })

})

