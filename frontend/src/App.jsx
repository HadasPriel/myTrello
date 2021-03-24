import React from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'

import { Home } from './pages/Home'
import { Board } from './pages/Board'
// import { AppHeader } from './cmps/AppHeader'
// import { AddBoard } from './cmps/board/AddBoard'
import { Boards } from './pages/Boards'
import { LoginSignup } from './pages/LoginSignup'
// import { AppHeader } from './cmps/AppHeader'
// import { CardEdit } from './pages/CardEdit'




export function App() {
  return (
    <div className="app">
      <Router>
        {/* <AppHeader /> */}
        <main className="main-app">
          <Switch>
            {/* <Route path="/user/:id" component={UserDetails} /> */}
            {/* <Route path="/login" component={LoginSignup} /> */}
            {/* <Route path="/chat" component={Chat} /> */}
            {/* <Route path="/board/:id/card/:cardId" component={CardEdit} /> */}
            <Route path="/board/:id" component={Board} />
            <Route path="/board" component={Boards} />
            <Route path="/login" component={LoginSignup} />
            <Route path="/" component={Home} />
          </Switch>
        </main>
        <footer>

        </footer>
      </Router>
    </div>
  )
}

