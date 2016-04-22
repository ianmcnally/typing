import AppConnected, { App } from '../app'
import { Prompt, Score, Controls } from 'src/components'
import { renderShallow } from 'lib/test-helpers'
import React from 'react'
import { Provider } from 'react-redux'
import store from 'src/store'
import { expect } from 'chai'
import { stub, spy } from 'sinon'
import * as getWordActions from 'src/actions/get-words'

describe('<App>', () => {

  context('when it is rendered', () => {
    const words = ['Charles', 'in', 'Charge']
    const dispatch = spy()
    let component

    before(() => {
      stub(getWordActions, 'getWords')

      component = renderShallow(<App words={words} dispatch={dispatch} />).output
    })

    it('renders <Prompt>', () => {
      expect(component).to.include(
        <Prompt />
      )
    })

    it('renders <Controls>', () => {
      expect(component).to.include(
        <Controls />
      )
    })

    it('renders <Score>', () => {
      expect(component).to.include(
        <Score />
      )
    })

    it('dispatches the getWords action', () => {
      expect(dispatch).to.have.been.calledOnce.calledWith(getWordActions.getWords())
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
          <App dispatch={store.dispatch} />
        </Provider>
      )
    })

  })

})

