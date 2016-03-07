import { Observable, Scheduler } from 'rx'

const ONE_SECOND = 1000

export const start = (durationInSeconds = 60, scheduler = Scheduler.default) => (
  Observable.interval(ONE_SECOND, scheduler)
    .take(durationInSeconds + 1)
    .map(count => durationInSeconds - count)
)

