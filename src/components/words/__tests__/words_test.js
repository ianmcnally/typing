import React from 'react'
import WordsConnected, { Words } from '../words'
import { Word } from 'src/components'
import { renderShallow } from 'src/test-helpers/lib'
import { createNewStore } from 'src/store'
import { expect } from 'chai'

const noRefCheck = () => {}

describe('<Words>', () => {

  context('when it is rendered', () => {
    const words = ['hey', 'ian']
    let component

    before(() => {
      const { output } = renderShallow(<Words words={words} />)
      component = output
    })

    it('renders a <Word> for every props.words', () => {
      words.forEach((word, index) => {
        expect(component).to.include(<Word value={word} index={index} />)
      })
    })

    it('has a container of type <article>', () => {
      expect(component.type).to.equal('article')
    })

  })

  context('when it is connected', () => {
    const words = ['hey', 'ian']
    let component

    before(() => {
      const store = createNewStore({ words })
      const { output } = renderShallow(<WordsConnected store={store} />)
      component = output
    })

    it('renders with state.words', () => {
      expect(component).to.include(
        <Words
          words={words}
          dispatch={noRefCheck}
          store={{
            dispatch: noRefCheck,
            getState: noRefCheck,
            replaceReducer: noRefCheck,
            subscribe: noRefCheck
          }}
        />
      )
    })

  })

})

