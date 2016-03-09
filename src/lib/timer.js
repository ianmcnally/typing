import { Observable } from 'rx'
import { get as getScheduler } from 'src/lib/scheduler'
import { ROUND_DURATION } from 'src/constants'

const ONE_SECOND = 1000

export const start = (durationInSeconds = ROUND_DURATION) => (
  Observable.interval(ONE_SECOND, getScheduler())
    .take(durationInSeconds)
    .map(count => durationInSeconds - count - 1)
)

