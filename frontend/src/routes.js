import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from './App'
import Home from './home'

import Sailor from './sailor/'

import WrongProfession from './wrongProfession/'
import NotFound from './notFound'

export const routes = (
    <div>
        <Route path="/" component={ App }>
            <IndexRoute component={ Home }/>
            <Route path="/wrong" component={ WrongProfession }/>
            <Route path="/sailor" component={ Sailor }/>
            <Route path="*" component={ NotFound }/>
        </Route>
    </div>
);