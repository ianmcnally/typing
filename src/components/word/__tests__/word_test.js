import React from 'react'
import { renderShallow } from 'src/test-helpers/lib'
import Word from '../word'
import { expect } from 'chai'

describe('<Word>', () => {
  const value = 'Ey there Charlie boy'
  let component

  before(() => {
    const { output } = renderShallow(<Word value={value} />)
    component = output
  })

  it('renders props.value as text wrapped in a span', () => {
    expect(component).to.eql(<span className='word__word'>{value}</span>)
  })

})

