import { TestScheduler } from 'rx'
import { start } from '../timer'
import { expect } from 'chai'
import first from 'lodash.first'
import last from 'lodash.last'

describe('lib/timer', () => {

  describe('start', () => {
    const scheduler = new TestScheduler()
    const output = []
    const duration = 60

    before(done => {
      start(duration, scheduler)
        .subscribe(
          x => output.push(x),
          () => {},
          done
        )

      scheduler.advanceBy((duration + 1) * 1000)
    })

    it(`returns a decrementing sequence from ${duration} to 0 over ${duration} seconds`, () => {
      expect(output).to.have.length(duration + 1)
      expect(first(output)).to.equal(duration)
      expect(last(output)).to.equal(0)
    })

  })

})

