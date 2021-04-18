import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadBoards } from '../store/actions/boardActions.js'
import { HomeHeader } from '../cmps/HomeHeader'
import { HomeHero } from '../cmps/home/HomeHero.jsx';
import { AboutMe } from '../cmps/home/AboutMe.jsx';
import { AppFooter } from '../cmps/AppFooter.jsx';
import { AboutTasx } from '../cmps/home/AboutTasx.jsx';


class _Home extends Component {
  state = {
    isNewBoard: false
  }

  componentDidMount() {
    //load temlates boards:
    this.props.loadBoards({ userId: '6004748cf9fd65ff47dc81e4' })
    //load loggedInUser or guest boards:
    const userId = this.props.loggedInUser?._id || '6007ffeea8c0ad4b8ad3c478'
    this.props.loadBoards({ userId })
  }

  toggleNewBoard = () => {
    this.setState({ isNewBoard: !this.state.isNewBoard })
  }

  onLoadNewBoard = (boardId) => {
    this.toggleNewBoard()
    this.props.history.push(`/board/${boardId}`)
  }

  scrollToBottom = () => {
    window.scrollTo(0, document.body.scrollHeight)
    console.log(this.state.templatesBoards);
  }




  render() {
    const { loggedInUser } = this.props
    return (
      <div className="home-page">
        <HomeHeader loggedInUser={loggedInUser} />
        <HomeHero scrollToBottom={this.scrollToBottom} />
        <AboutTasx />
        <AboutMe />
        <AppFooter />
      </div>
    )
  }
}
// <section className="board-lists">
//   {templatesBoards && <BoardList boards={this.props.templatesBoards} title="Templates boards" toggleNewBoard={this.toggleNewBoard} />}
//   <BoardList boards={this.props.boards} title="Personal boards" toggleNewBoard={this.toggleNewBoard} />
//   {/* {loggedInUser && <BoardList boards={this.props.boards} title="Personal boards" toggleNewBoard={this.toggleNewBoard} />} */}
// </section>

const mapStateToProps = state => {
  return {
    boards: state.boardModule.boards,
    templatesBoards: state.boardModule.templatesBoards,
    loggedInUser: state.userModule.loggedInUser
  }
}
const mapDispatchToProps = {
  loadBoards
}

export const Home = connect(mapStateToProps, mapDispatchToProps)(_Home)
