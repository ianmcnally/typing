import React from 'react'
import { render } from 'react-dom'
import { Root } from 'src/app'

/* global module:true */
if (module.hot) // webpack hot module reloading
  module.hot.accept()
/* global module:false */

render(<Root />, document.getElementById('main'))

