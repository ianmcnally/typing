import React from 'react'
import { renderShallow } from 'lib/test-helpers'
import * as actions from 'src/actions'
import TimerConnected, { Timer } from '../timer'
import StartButton from '../start-button'
import Countdown from '../countdown'
import { createNewStore } from 'src/store'
import { expect } from 'chai'
import { findWithType } from 'react-shallow-testutils'
import { spy, stub } from 'sinon'

const noRefCheck = () => {}

describe('<Timer>', () => {

  context('when it renders', () => {
    const timeRemaining = 5
    let component

    before(() => {
      const { output } = renderShallow(<Timer timeRemaining={timeRemaining} />)
      component = output
    })

    it('renders <Countdown> with props.timeRemaining', () => {
      expect(component).to.include(
        <Countdown timeRemaining={timeRemaining} />
      )
    })

    it('renders <StartButton>', () => {
      expect(component).to.include(
        <StartButton onClick={noRefCheck} />
      )
    })

  })

  context('when <StartButton> is clicked', () => {
    const dispatch = spy()

    before(() => {
      stub(actions, 'startTimer').returns({})

      const component = renderShallow(<Timer dispatch={dispatch} timeRemaining={0} />).output
      const startButton = findWithType(component, StartButton)

      startButton.props.onClick()
    })

    after(() => {
      actions.startTimer.restore()
    })

    it('dispatches startTimer()', () => {
      expect(actions.startTimer).to.have.been.called
      expect(dispatch).to.have.been.calledWith(actions.startTimer())
    })

  })

  context('when it is connected', () => {
    const timeRemaining = 100
    let component

    before(() => {
      const store = createNewStore({ timeRemaining })
      const { output } = renderShallow(<TimerConnected store={store} />)
      component = output
    })

    it('renders <Timer>', () => {
      expect(component).to.be.ok
      expect(component.type).to.equal(Timer)
    })

    it('injects state.timeRemaining as props.timeRemaining', () => {
      expect(component.props.timeRemaining).to.be.ok
      expect(component.props.timeRemaining).to.eql(timeRemaining)
    })

  })

})

