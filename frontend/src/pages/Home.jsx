import React from 'react'
import { connect } from 'react-redux'
import { HomeHeader } from '../cmps/HomeHeader'
import { HomeHero } from '../cmps/home/HomeHero.jsx';
import { AboutMe } from '../cmps/home/AboutMe.jsx';
import { AppFooter } from '../cmps/AppFooter.jsx';
import { AboutTasx } from '../cmps/home/AboutTasx.jsx';


function _Home({ loggedInUser }) {

  const scrollToBottom = () => {
    window.scrollTo(0, document.body.scrollHeight)
  }

  return (
    <div className="home-page">
      <HomeHeader loggedInUser={loggedInUser} />
      <HomeHero scrollToBottom={scrollToBottom} />
      <AboutTasx />
      <AboutMe />
      <AppFooter />
    </div>
  )
}


const mapStateToProps = state => {
  return {
    loggedInUser: state.userModule.loggedInUser
  }
}


export const Home = connect(mapStateToProps)(_Home)
