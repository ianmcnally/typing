/* eslint-env node */
import chai from 'chai'
import jsxChai from 'jsx-chai'
import sinonChai from 'sinon-chai'

chai.use(sinonChai)
chai.use(jsxChai)

console.error = msg => { throw new Error(msg) } // eslint-disable-line no-console

const testsContext = require.context('../../src', true, /_test$/)
testsContext.keys().forEach(testsContext)

