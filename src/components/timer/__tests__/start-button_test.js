import React from 'react'
import StartButton from '../start-button'
import { renderShallow } from 'lib/test-helpers'
import { expect } from 'chai'
import { spy } from 'sinon'

describe('Timer <StartButton>', () => {

  context('when it is rendered', () => {
    const onClick = spy()
    let component

    before(() => {
      const { output } = renderShallow(<StartButton onClick={onClick} disabled />)
      component = output
    })

    it('renders a button', () => {
      expect(component.type).to.equal('button')
    })

    it('it labeled as `Start`', () => {
      expect(component).to.include('Start')
    })

    it('sets onClick to props.onClick', () => {
      expect(component.props.onClick).to.equal(onClick)
    })

  })

  context('when props.disabled=true', () => {
    const onClick = spy()
    const disabled = true
    let component

    before(() => {
      component = renderShallow(<StartButton disabled={disabled} onClick={onClick} />).output
    })

    it('sets disabled=true on the button', () => {
      expect(component.props.disabled).to.be.true
    })

    it('adds a disabled class', () => {
      expect(component.props.className).to.include('states__is-disabled')
    })

  })

  context('when props.disabled=false', () => {
    const onClick = spy()
    const disabled = false
    let component

    before(() => {
      component = renderShallow(<StartButton disabled={disabled} onClick={onClick} />).output
    })

    it('sets disabled=false on the button', () => {
      expect(component.props.disabled).to.be.false
    })

    it('does not add a disabled class', () => {
      expect(component.props.className).not.to.include('states__is-disabled')
    })
  })
})

