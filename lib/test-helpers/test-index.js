/* eslint-env node */
import chai from 'chai'
import jsxChai from 'jsx-chai'
import sinonChai from 'sinon-chai'

chai.use(sinonChai)
chai.use(jsxChai)

const testsContext = require.context('../../src', true, /_test$/)
testsContext.keys().forEach(testsContext)

