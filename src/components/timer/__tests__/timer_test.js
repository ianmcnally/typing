import React from 'react'
import * as timerActions from 'src/actions/start-timer'
import * as retryActions from 'src/actions/retry'
import { renderShallow } from 'lib/test-helpers'
import Timer from '../timer'
import StartButton from '../start-button'
import RetryButton from '../retry-button'
import Countdown from '../countdown'
import { expect } from 'chai'
import { findWithType } from 'react-shallow-testutils'
import { spy, stub } from 'sinon'

const noRefCheck = () => {}

describe('<Timer>', () => {

  context('when it renders', () => {
    const timeRemaining = 5
    const round = { started: false, ended: false }
    let component

    before(() => {
      const { output } = renderShallow(<Timer timeRemaining={timeRemaining} dispatch={spy()} round={round} />)
      component = output
    })

    it('renders a container as a <span>', () => {
      expect(component.type).to.eql('span')
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

    it('renders <RetryButton>', () => {
      expect(component).to.include(
        <RetryButton onClick={noRefCheck} />
      )
    })

  })

  context('when the round has started', () => {
    const timeRemaining = 5
    const round = { started: true, ended: false }
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

    context('and props.disableStart is not true', () => {
      const disableStart = false
      const timeRemaining = 5
      const round = { started: false, ended: false }
      let component

      before(() => {
        component = renderShallow(
          <Timer disableStart={disableStart} timeRemaining={timeRemaining} dispatch={spy()} round={round} />
        ).output
      })

      it('renders <StartButton> with disabled=false', () => {
        expect(component).to.include(
          <StartButton disabled={false} onClick={noRefCheck} />
        )
      })

    })

    context('and props.disableStart=true', () => {
      const disableStart = true
      const timeRemaining = 5
      const round = { started: false, ended: false }
      let component

      before(() => {
        component = renderShallow(
          <Timer disableStart={disableStart} timeRemaining={timeRemaining} dispatch={spy()} round={round} />
        ).output
      })

      it('renders <StartButton> with disabled=true', () => {
        expect(component).to.include(
          <StartButton disabled={true} onClick={noRefCheck} /> // eslint-disable-line react/jsx-boolean-value
        )
      })

    })

  })

  context('when the round has ended', () => {
    const timeRemaining = 5
    const round = { started: true, ended: true }
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
    const round = { started: false, ended: false }

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

  context('when <RetryButton> is clicked', () => {
    const dispatch = spy()
    const round = { started: true, ended: false }

    before(() => {
      stub(retryActions, 'retry').returns({})

      const component = renderShallow(<Timer dispatch={dispatch} round={round} timeRemaining={5} />).output
      const retryButton = findWithType(component, RetryButton)

      retryButton.props.onClick()
    })

    after(() => {
      retryActions.retry.restore()
    })

    it('dispatches retry()', () => {
      expect(retryActions.retry).to.have.been.called
      expect(dispatch).to.have.been.calledWith(retryActions.retry())
    })
  })

})

