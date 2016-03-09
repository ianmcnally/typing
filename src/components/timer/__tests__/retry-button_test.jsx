import RetryButton from '../retry-button'
import { renderShallow } from 'lib/test-helpers'
import { expect } from 'chai'
import React from 'react'
import { spy } from 'sinon'

describe('Timer <RetryButton>', () => {

  context('when it is rendered', () => {
    const onClick = spy()
    let component

    before(() => {
      component = renderShallow(<RetryButton onClick={onClick} />).output
    })

    it('renders a button', () => {
      expect(component.type).to.eql('button')
    })

    it('renders with the label `Retry`', () => {
      expect(component).to.include('Retry')
    })

    it('sets onClick from props.onClick', () => {
      expect(component.props.onClick).to.equal(onClick)
    })

  })

})
