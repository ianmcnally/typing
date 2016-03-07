import { createStore, combineReducers, applyMiddleware } from 'redux'
import * as reducers from 'src/reducers'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'

const logger = createLogger({
  predicate: () => process.env.NODE_ENV === 'development'
})

const initialState = {
  words: ['a', 'b', 'c']
}

export const createNewStore = (state = initialState) => (
  createStore(
    combineReducers(reducers),
    state,
    applyMiddleware(thunk, logger)
  )
)

export default createNewStore()

