import ControlsConnected, { Controls } from '../controls'
import { TypingBox, Timer } from 'src/components'
import { renderShallow } from 'lib/test-helpers'
import React from 'react'
import { expect } from 'chai'
import { createNewStore } from 'src/store'
import { spy } from 'sinon'

describe('<Controls>', () => {

  context('when it is rendered', () => {
    const disableInput = true
    const dispatch = spy()
    const round = { started: false, ended: false }
    const timeRemaining = 33
    let component

    before(() => {
      component = renderShallow(
        <Controls disableInput={disableInput} dispatch={dispatch} round={round} timeRemaining={timeRemaining} />
      ).output
    })

    it('renders the container as an article', () => {
      expect(component.type).to.eql('article')
    })

    it('renders a <TypingBox>', () => {
      expect(component).to.include(
        <TypingBox disabled={disableInput} dispatch={dispatch} round={round} />
      )
    })

    it('renders a <Timer>', () => {
      expect(component).to.include(
        <Timer disableStart={disableInput} dispatch={dispatch} round={round} timeRemaining={timeRemaining} />
      )
    })

  })

  context('when it is connected', () => {
    const round = { started: false, ended: false }
    const timeRemaining = 43
    const words = []
    let component

    before(() => {
      const store = createNewStore({ round, timeRemaining, words })
      component = renderShallow(<ControlsConnected store={store} />).output
    })

    it('renders <Controls>', () => {
      expect(component.type).to.eql(Controls)
    })

    it('injects state.round as props.round', () => {
      expect(component.props.round).to.equal(round)
    })

    it('injects state.timeRemaining as props.timeRemaining', () => {
      expect(component.props.timeRemaining).to.equal(timeRemaining)
    })

    context('and state.words is not empty', () => {
      const round = { started: false, ended: false }
      const timeRemaining = 43
      const words = ['a', 'b']
      let component

      before(() => {
        const store = createNewStore({ round, timeRemaining, words })
        component = renderShallow(<ControlsConnected store={store} />).output
      })

      it('sets props.disableInput as false', () => {
        expect(component.props.disableInput).to.be.false
      })

    })

    context('and state.words is empty', () => {
      const round = { started: false, ended: false }
      const timeRemaining = 43
      const words = []
      let component

      before(() => {
        const store = createNewStore({ round, timeRemaining, words })
        component = renderShallow(<ControlsConnected store={store} />).output
      })

      it('sets props.disableInput as true', () => {
        expect(component.props.disableInput).to.be.true
      })

    })

  })

})
