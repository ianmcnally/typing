import React from 'react'
import { expect } from 'chai'
import TypingBox from '../typing-box'
import { renderShallow } from 'src/test-helpers/lib'

describe('<TypingBox>', () => {
  let component

  before(() => {
    const { output } = renderShallow(<TypingBox />)
    component = output
  })

  it('renders an input element', () => {
    expect(component).to.eql(
      <input type='text' autoFocus/>
    )
  })

})
