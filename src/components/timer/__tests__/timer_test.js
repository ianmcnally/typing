import React from 'react'
import * as timerActions from 'src/actions/start-timer'
import { renderShallow } from 'lib/test-helpers'
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
    const round = { started: false }
    let component

    before(() => {
      const { output } = renderShallow(<Timer timeRemaining={timeRemaining} dispatch={spy()} round={round} />)
      component = output
    })

    it('renders <Countdown> with props.timeRemaining', () => {
      expect(component).to.include(
        <Countdown timeRemaining={timeRemaining} />
      )
    })

    it('renders <StartButton>', () => {
      expect(component).to.include(
        <StartButton disabled={false} onClick={noRefCheck} />
      )
    })

  })

  context('when the round has started', () => {
    const timeRemaining = 5
    const round = { started: true }
    let component

    before(() => {
      component = renderShallow(<Timer timeRemaining={timeRemaining} dispatch={spy()} round={round} />).output
    })

    it('renders <StartButton> with disabled=true', () => {
      expect(component).to.include(
        <StartButton disabled={true} onClick={noRefCheck} /> //eslint-disable-line react/jsx-boolean-value
      )
    })

  })

  context('when the round has not started', () => {
    const timeRemaining = 5
    const round = { started: false }
    let component

    before(() => {
      component = renderShallow(<Timer timeRemaining={timeRemaining} dispatch={spy()} round={round} />).output
    })

    it('renders <StartButton> with disabled=false', () => {
      expect(component).to.include(
        <StartButton disabled={false} onClick={noRefCheck} />
      )
    })

  })

  context('when the round has ended', () => {
    const timeRemaining = 5
    const round = { ended: true }
    let component

    before(() => {
      component = renderShallow(<Timer timeRemaining={timeRemaining} dispatch={spy()} round={round} />).output
    })

    it('renders <StartButton> with disabled=true', () => {
      expect(component).to.include(
        <StartButton disabled={true} onClick={noRefCheck} /> //eslint-disable-line react/jsx-boolean-value
      )
    })

  })

  context('when <StartButton> is clicked', () => {
    const dispatch = spy()
    const round = { started: false }

    before(() => {
      stub(timerActions, 'startTimer').returns({})

      const component = renderShallow(<Timer dispatch={dispatch} round={round} timeRemaining={0} />).output
      const startButton = findWithType(component, StartButton)

      startButton.props.onClick()
    })

    after(() => {
      timerActions.startTimer.restore()
    })

    it('dispatches startTimer()', () => {
      expect(timerActions.startTimer).to.have.been.called
      expect(dispatch).to.have.been.calledWith(timerActions.startTimer())
    })

  })

  context('when it is connected', () => {
    const timeRemaining = 100
    const round = { started: false }
    let component

    before(() => {
      const store = createNewStore({ round, timeRemaining })
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

    it('injects state.round as state.round', () => {
      expect(component.props.round).to.be.ok
      expect(component.props.round).to.equal(round)
    })

  })

})

