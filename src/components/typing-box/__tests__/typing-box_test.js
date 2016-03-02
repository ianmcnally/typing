import React from 'react'
import TypingBox from '../typing-box'
import { findDOMNode } from 'react-dom'
import { expect } from 'chai'
import { renderShallow } from 'src/test-helpers/lib'
import { renderIntoDocument, Simulate } from 'react-addons-test-utils'
import defer from 'lodash.defer'

const noRefCheck = () => {}

describe('<TypingBox>', () => {

  context('when it renders', () => {
    let component

    before(() => {
      const { output } = renderShallow(<TypingBox />)
      component = output
    })

    it('renders an input element', () => {
      expect(component).to.eql(
        <input type='text' autoFocus onKeyDown={noRefCheck} />
      )
    })

  })

  context('when the spacebar is pressed', () => {
    let input

    before(done => {
      const component = renderIntoDocument(<TypingBox />)
      input = findDOMNode(component)

      input.value = 'zzz'
      Simulate.change(input)

      Simulate.keyDown(input, { keyCode : 32 })

      defer(done)
    })

    it('clears the input text', () => {
      expect(input.value).to.be.empty
    })

    xit('dispatches a word advancement action', () => {
    })

  })

})
