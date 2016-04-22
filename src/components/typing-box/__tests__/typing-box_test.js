import React from 'react'
import TypingBox from '../typing-box'
import styles from '../typing-box.css'
import * as wordActions from 'src/actions/advance-word'
import { expect } from 'chai'
import { renderShallow } from 'lib/test-helpers'
import defer from 'lodash.defer'
import { spy, stub } from 'sinon'
import { getMountedInstance } from 'react-shallow-testutils'

const noRefCheck = () => {}

describe('<TypingBox>', () => {

  context('when it renders', () => {
    const disabled = false
    const dispatch = spy()
    const round = { started: false, ended: false }
    let component

    before(() => {
      const { output } = renderShallow(<TypingBox disabled={disabled} dispatch={dispatch} round={round} />)
      component = output
    })

    it('renders an input element', () => {
      expect(component).to.eql(
        <input className={styles.input} disabled={false} ref='input' type='text' autoFocus onKeyDown={noRefCheck} />
      )
    })

  })

  context('when props.disabled=true', () => {
    const disabled = true
    const dispatch = spy()
    const round = { started: false, ended: false }
    let component

    before(() => {
      const { output } = renderShallow(<TypingBox disabled={disabled} dispatch={dispatch} round={round} />)
      component = output
    })

    it('sets the disabled attribute on the input', () => {
      expect(component.props.disabled).to.be.true
    })

  })

  context('when props.disabled=false', () => {
    const disabled = false
    const dispatch = spy()
    const round = { started: false, ended: false }
    let component

    before(() => {
      const { output } = renderShallow(<TypingBox disabled={disabled} dispatch={dispatch} round={round} />)
      component = output
    })

    it('sets the disabled attribute on the input', () => {
      expect(component.props.disabled).to.be.false
    })

  })

  context('when the spacebar is pressed', () => {
    const dispatch = spy()
    const round = { started: true, ended: false }
    const value = 'zzz'
    const input = { value }

    before(done => {
      stub(wordActions, 'advanceWord').withArgs(value).returns({ value })

      const component = renderShallow(<TypingBox dispatch={dispatch} round={round} />).output

      component.props.onKeyDown({ keyCode: 32, target: input })

      defer(done)
    })

    after(() => {
      wordActions.advanceWord.restore()
    })

    it('clears the input text', () => {
      expect(input.value).to.be.empty
    })

    it('dispatches a word advancement action', () => {
      expect(dispatch).to.have.been.calledWith(wordActions.advanceWord(value))
    })

  })

  context('when the round has just started', () => {
    const input = { focus: spy() }

    before(() => {
      const prevProps = { round: { started: false, ended: false } }
      const props = { round: { started: true, ended: false } }

      const { renderer } = renderShallow(<TypingBox dispatch={spy()} {...props} />)
      const componentInstance = getMountedInstance(renderer)
      componentInstance.refs = { input }

      componentInstance.componentDidUpdate(prevProps)
    })

    it('focuses the input', () => {
      expect(input.focus).to.have.been.calledOnce
    })

  })

  context('when the round has already started', () => {
    const input = { focus: spy() }

    before(() => {
      const prevProps = { round: { started: true, ended: false } }
      const props = { round: { started: true, ended: false } }

      const { renderer } = renderShallow(<TypingBox dispatch={spy()} {...props} />)
      const componentInstance = getMountedInstance(renderer)
      componentInstance.refs = { input }

      componentInstance.componentDidUpdate(prevProps)
    })

    it('does not focus the input', () => {
      expect(input.focus).not.to.have.been.called
    })

  })

  context('when the round has not started', () => {
    const input = { focus: spy() }

    before(() => {
      const prevProps = { round: { started: false, ended: false } }
      const props = { round: { started: false, ended: false } }

      const { renderer } = renderShallow(<TypingBox dispatch={spy()} {...props} />)
      const componentInstance = getMountedInstance(renderer)
      componentInstance.refs = { input }

      componentInstance.componentDidUpdate(prevProps)
    })

    it('does not focus the input', () => {
      expect(input.focus).not.to.have.been.called
    })

  })

  context('when retrying', () => {

    context('after a round has ended', () => {
      const input = { focus: spy() }

      before(() => {
        const prevProps = { round: { started: true, ended: true } }
        const props = { round: { started: true, ended: false } }

        const { renderer } = renderShallow(<TypingBox dispatch={spy()} {...props} />)
        const componentInstance = getMountedInstance(renderer)
        componentInstance.refs = { input }

        componentInstance.componentDidUpdate(prevProps)
      })

      it('focuses the input', () => {
        expect(input.focus).to.have.been.calledOnce
      })

    })

    context('during a round', () => {
      const input = { focus: spy() }

      before(() => {
        const prevProps = { round: { started: true, ended: false } }
        const props = { round: { started: false, ended: false } }

        const { renderer } = renderShallow(<TypingBox dispatch={spy()} {...props} />)
        const componentInstance = getMountedInstance(renderer)
        componentInstance.refs = { input }

        componentInstance.componentDidUpdate(prevProps)
      })

      it('focuses the input', () => {
        expect(input.focus).to.have.been.calledOnce
      })

    })

  })

})
