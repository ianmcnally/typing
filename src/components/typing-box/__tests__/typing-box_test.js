import React from 'react'
import { TypingBox } from '../typing-box'
import * as actions from 'src/actions'
import { findDOMNode } from 'react-dom'
import { expect } from 'chai'
import { renderShallow } from 'src/test-helpers/lib'
import { renderIntoDocument, Simulate } from 'react-addons-test-utils'
import defer from 'lodash.defer'
import { spy, stub } from 'sinon'

const noRefCheck = () => {}

describe('<TypingBox>', () => {

  context('when it renders', () => {
    const dispatch = spy()
    let component

    before(() => {
      const { output } = renderShallow(<TypingBox dispatch={dispatch} />)
      component = output
    })

    it('renders an input element', () => {
      expect(component).to.eql(
        <input type='text' autoFocus onKeyDown={noRefCheck} />
      )
    })

  })

  context('when the spacebar is pressed', () => {
    const dispatch = spy()
    const value = 'zzz'
    let input

    before(done => {
      stub(actions, 'advanceAWord').withArgs(value).returns({ value })

      const component = renderIntoDocument(<TypingBox dispatch={dispatch} />)
      input = findDOMNode(component)

      input.value = value
      Simulate.change(input)

      Simulate.keyDown(input, { keyCode: 32 })

      defer(done)
    })

    after(() => {
      actions.advanceAWord.restore()
    })

    it('clears the input text', () => {
      expect(input.value).to.be.empty
    })

    it('dispatches a word advancement action', () => {
      expect(dispatch).to.have.been.calledWith(actions.advanceAWord(value))
    })

  })

})
