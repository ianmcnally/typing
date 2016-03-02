/* eslint-env node */

import './requires/chai-extensions'

const testsContext = require.context('..', true, /_test$/)
testsContext.keys().forEach(testsContext)

