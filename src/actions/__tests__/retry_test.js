import { retry } from '../retry'
import { RETRY } from 'src/action-types'
import { expect } from 'chai'

describe('retry action', () => {

  context('when it is called', () => {
    let output

    before(() => {
      output = retry()
    })

    it(`returns an object with type ${RETRY}`, () => {
      expect(output).to.eql({
        type: RETRY
      })
    })

  })

})

