// round status selectors (roundJustStated and retrying)
// require previous state and current state,
// so they override reselect's selector(state, props) signature
// to be called with selector(previousState, currentState)

import { createSelector } from 'reselect'
import { roundSelector } from './state'

const nextRoundSelector = (_, state) => roundSelector(state)

export const roundJustStarted = createSelector(
  roundSelector,
  nextRoundSelector,
  (prevRound, round) => !prevRound.started && round.started
)

export const retrying = createSelector(
  roundSelector,
  nextRoundSelector,
  (prevRound, round) => {
    const wasEndedAndNowIsNot = prevRound.ended && !round.ended
    const wasStartedAndNowIsNot = prevRound.started && !round.started

    return wasStartedAndNowIsNot || wasEndedAndNowIsNot
  }

)

export const roundCanceled = createSelector(
  roundSelector,
  round => !round.started && !round.ended
)

