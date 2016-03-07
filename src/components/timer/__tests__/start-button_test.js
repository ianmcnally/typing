import React from 'react'
import StartButton from '../start-button'
import { renderShallow } from 'lib/test-helpers'
import { expect } from 'chai'
import { spy } from 'sinon'

describe('Timer <StartButton>', () => {
  const onClick = spy()
  let component

  before(() => {
    const { output } = renderShallow(<StartButton onClick={onClick} />)
    component = output
  })

  it('renders a button', () => {
    expect(component).to.eql(
      <button onClick={onClick}>Start</button>
    )
  })

  it('sets onClick to props.onClick', () => {
    expect(component.props.onClick).to.equal(onClick)
  })

})

