import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from './App'
import Home from './home'

import Sailor from './sailor/'

import HaveDocuments from './haveDocuments/'
import NoDocuments from './noDocuments/'

import WrongProfession from './wrongProfession/'
import NotFound from './notFound'

export const routes = (
    <div>
        <Route path="/" component={ App }>
            <IndexRoute component={ Home }/>
            <Route path="/wrong" component={ WrongProfession }/>
            <Route path="/sailor" component={ Sailor }/>
            <Route path="/no-documents" component={ NoDocuments }/>
            <Route path="/with-documents" component={ HaveDocuments }/>
            <Route path="*" component={ NotFound }/>
        </Route>
    </div>
);