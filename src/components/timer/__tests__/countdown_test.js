import React from 'react'
import Countdown from '../countdown'
import { renderShallow } from 'lib/test-helpers'
import { expect } from 'chai'

describe('Timer <Countdown>', () => {
  const timeRemaining = 59
  let component

  before(() => {
    const { output } = renderShallow(<Countdown timeRemaining={timeRemaining} />)
    component = output
  })

  it('renders the time remaining', () => {
    expect(component).to.eql(
      <span>{timeRemaining}</span>
    )
  })

})

