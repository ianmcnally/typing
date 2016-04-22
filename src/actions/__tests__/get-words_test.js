import { getWords } from '../get-words'
import * as ajax from 'src/fetch'
import { stub, spy } from 'sinon'
import { expect } from 'chai'
import { WORD_API_URL } from 'src/constants'
import {
  WORDS_FETCHED
} from 'src/action-types'

describe('getWords action', () => {

  context('when it is dispatched', () => {
    const dispatch = spy()

    before(() => {
      const mockResponse = [{ word: 'hey' }]
      const response = new Response(JSON.stringify(mockResponse))

      stub(ajax, 'fetch').returns(Promise.resolve(response))

      return getWords()(dispatch)
    })

    after(() => {
      ajax.fetch.restore()
    })

    it('will make an ajax request to a url', () => {
      expect(ajax.fetch).to.have.been.calledOnce.calledWith(WORD_API_URL)
    })

  })

  context('when it is dispatched and resolves successfully', () => {
    const dispatch = spy()

    before(() => {
      const mockResponse = [{ word: 'hey' }]
      const response = new Response(JSON.stringify(mockResponse))

      stub(ajax, 'fetch').returns(Promise.resolve(response))

      return getWords()(dispatch)
    })

    after(() => {
      ajax.fetch.restore()
    })

    it(`dispatches ${WORDS_FETCHED} with words`, () => {
      expect(dispatch).to.have.been.calledWith({
        type: WORDS_FETCHED,
        words: ['hey']
      })
    })

  })

  context('when it is dispatched and resolves unsuccessfully', () => {
    const dispatch = spy()

    before(done => {
      stub(ajax, 'fetch').returns(Promise.reject(new Error()))

      getWords()(dispatch).catch(() => done())
    })

    after(() => {
      ajax.fetch.restore()
    })

    it('does not dispatch an action', () => {
      expect(dispatch).not.to.have.been.called
    })

  })

})
