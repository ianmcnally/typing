import { retry } from '../retry'
import * as getWordsActions from 'src/actions/get-words'
import { RETRY } from 'src/action-types'
import { expect } from 'chai'
import { spy, stub } from 'sinon'

describe('retry action', () => {

  context('when it is called', () => {
    const dispatch = spy()

    before(() => {
      stub(getWordsActions, 'getWords').returns({ type: 'GET_WORDS_STUB!' })

      retry()(dispatch)
    })

    after(() => {
      getWordsActions.getWords.restore()
    })

    it(`dispatches an action with type ${RETRY}`, () => {
      expect(dispatch).to.have.been.calledWith({
        type: RETRY
      })
    })

    it('dispatches the getWords action', () => {
      expect(dispatch).to.have.been.calledWith(getWordsActions.getWords())
    })

  })

})

