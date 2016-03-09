import RetryButton from '../retry-button'
import { renderShallow } from 'lib/test-helpers'
import { expect } from 'chai'
import React from 'react'

describe('Timer <RetryButton>', () => {

  context('when it is rendered', () => {
    let component

    before(() => {
      component = renderShallow(<RetryButton />).output
    })

    it('renders a button with the label `Retry`', () => {
      expect(component).to.eql(<button>Retry</button>)
    })

  })

})
