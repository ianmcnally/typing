import React from 'react'
import { TypingBox } from '../typing-box'
import * as actions from 'src/actions'
import { expect } from 'chai'
import { renderShallow } from 'lib/test-helpers'
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
        <input className='typing-box__input' type='text' autoFocus onKeyDown={noRefCheck} />
      )
    })

  })

  context('when the spacebar is pressed', () => {
    const dispatch = spy()
    const value = 'zzz'
    const input = { value }

    before(done => {
      stub(actions, 'advanceAWord').withArgs(value).returns({ value })

      const component = renderShallow(<TypingBox dispatch={dispatch} />).output

      component.props.onKeyDown({ keyCode: 32, target: input })

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
