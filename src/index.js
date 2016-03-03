import React from 'react'
import { render } from 'react-dom'
import { App } from 'src/components'

/* global module:true */
if (module.hot) // webpack hot module reloading
  module.hot.accept()
/* global module:false */

render(<App />, document.getElementById('main'))

