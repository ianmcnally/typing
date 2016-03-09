import AppConnected, { App } from '../app'
import { Prompt, Score, TypingBox, Timer } from 'src/components'
import { renderShallow } from 'lib/test-helpers'
import React from 'react'
import { Provider } from 'react-redux'
import store from 'src/store'
import { expect } from 'chai'
import { spy } from 'sinon'

describe('<App>', () => {

  context('when it is rendered', () => {
    const words = ['Charles', 'in', 'Charge']
    const dispatch = spy()
    let component

    before(() => {
      component = renderShallow(<App words={words} dispatch={dispatch} />).output
    })

    it('renders <Prompt>', () => {
      expect(component).to.include(
        <Prompt />
      )
    })

    it('renders <TypingBox>', () => {
      expect(component).to.include(
        <TypingBox />
      )
    })

    it('renders <Timer>', () => {
      expect(component).to.include(
        <Timer />
      )
    })

    it('renders <Score>', () => {
      expect(component).to.include(
        <Score />
      )
    })

  })

  context('when it is connected', () => {
    let component

    before(() => {
      component = renderShallow(<AppConnected />).output
    })

    it('renders a <Provider> wrapped <App>', () => {
      expect(component).to.eql(
        <Provider store={store}>
          <App />
        </Provider>
      )
    })

  })

})

