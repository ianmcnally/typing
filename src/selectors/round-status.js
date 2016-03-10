// round status selectors require previous state and current state,
// so they override reselects' selector(state, props) signature
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
  (prevRound, round) => prevRound.ended && !round.ended
)

