import { Observable } from 'rx'
import { get as getScheduler } from 'src/lib/scheduler'

const ONE_SECOND = 1000

export const start = (durationInSeconds = 60) => (
  Observable.interval(ONE_SECOND, getScheduler())
    .take(durationInSeconds)
    .map(count => durationInSeconds - count - 1)
)

