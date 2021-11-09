import React from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'

import { Home } from './pages/Home'
import { Board } from './pages/Board'
import { Boards } from './pages/Boards'
import { LoginSignup } from './pages/LoginSignup'


export function App() {
  return (
    <div className="app">
      <Router>
        <main className="main-app">
          <Switch>
            <Route path="/board/:id" component={Board} />
            <Route path="/board" component={Boards} />
            <Route path="/login" component={LoginSignup} />
            <Route path="/" component={Home} />
          </Switch>
        </main>
      </Router>
    </div>
  )
}

