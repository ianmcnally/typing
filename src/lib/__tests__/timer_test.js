import { TestScheduler } from 'rx'
import * as scheduler from 'src/lib/scheduler'
import { start } from '../timer'
import { expect } from 'chai'
import { stub } from 'sinon'
import first from 'lodash.first'
import last from 'lodash.last'

describe('lib/timer', () => {

  describe('start', () => {
    const output = []
    const duration = 60

    before(done => {
      const testScheduler = new TestScheduler()

      stub(scheduler, 'get').returns(testScheduler)

      start(duration)
        .subscribe(
          x => output.push(x),
          () => {},
          done
        )

      testScheduler.advanceBy((duration + 1) * 1000)
    })

    after(() => {
      scheduler.get.restore()
    })

    it(`returns a decrementing sequence from ${duration - 1} to 0 over ${duration} seconds`, () => {
      expect(output).to.have.length(duration)
      expect(first(output)).to.equal(duration - 1)
      expect(last(output)).to.equal(0)
    })

  })

})

