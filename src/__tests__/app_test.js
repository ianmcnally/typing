import { App, Words } from 'src/app'
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

})

