import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { BoardList } from '../cmps/board/BoardList'
// import { AddBoard } from '../cmps/board/AddBoard'
import { loadBoards } from '../store/actions/boardActions.js'
import { HomeHeader } from '../cmps/HomeHeader'
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom'
// import Icon from '@material-ui/core/Icon';
// import Uploader from '../cmps/Uploader';

// import { socketService } from '../services/socketService'

class _Home extends Component {
  state = {
    isNewBoard: false
  }

  componentDidMount() {
    this.props.loadBoards()
  }
  // onUploadImage = (url) =>{
  //   console.log('URL:', url)
  //   //   const toy = {
  //   //     imgUrl: url
  //   //   }
  //   //   this.props.updateToy(toy)
  // }



  toggleNewBoard = () => {
    console.log('I am in new board')
    this.setState({ isNewBoard: !this.state.isNewBoard })
  }

  onLoadNewBoard = (boardId) => {
    this.toggleNewBoard()
    this.props.history.push(`/board/${boardId}`)
  }

  scrollToBottom = () => {
    window.scrollTo(0, document.body.scrollHeight)

  }




  render() {
    const { loggedInUser } = this.props
    return (
      <div className="home-wraper">
        <HomeHeader loggedInUser={loggedInUser} />

        <div className="home-img-container">
          <div className="get-started-container">
            <h1>TASX</h1>
            <h3>Manage your teamwork with the ease of your fingers</h3>
            {/* <Link to="/board" ><button className="header-board"> Boards </button></Link> */}

            <div className="get-started-btn">
              <Link to="/board/600c37d2a8c0ad4b8ab661f6" >
                <Button variant="contained" size="large" color="primary" className="get-started" onClick={this.toggleNewBoard}>
                  Get Started
            </Button>
              </Link>
            </div>
            {/* {this.state.isNewBoard && <AddBoard toggleNewBoard={this.toggleNewBoard} onLoadNewBoard={this.onLoadNewBoard} />} */}
            <button className="scroll-down" onClick={this.scrollToBottom}></button>
          </div>
        </div >


        <div className="welcome-container">

          <article className="welcome1">
            <div className="left-side">
              <img className="img1" src="https://res.cloudinary.com/ddgevj2yp/image/upload/v1611582111/tasx1_t6jc82.png" alt="" />
            </div>
            <div className="right-side">
              <h2>Hit your deadlines</h2>
              <h3>Follow your your team’s progress and keep work moving across teams  — all from one place.</h3>
            </div>



          </article>




          <article className="welcome2">
            <div className="right-side">
              <h2>Collaborate and build</h2>
              <h3>Share ideas and more so teammates can tap into the same pool of knowledge whenever they need. </h3>
            </div>

            <div className="left-side">
              <img className="img2" src="https://res.cloudinary.com/ddgevj2yp/image/upload/v1611582232/tasx2_rjorq4.png" alt="" />
            </div>

          </article>



          <article className="welcome3">
            <div className="right-side">
              <img className="img3" src="https://res.cloudinary.com/ddgevj2yp/image/upload/v1611582362/tasx3_wrsped.png" alt="" />
            </div>
            <div className="left-side">
              <h2>Keep everyone looped in</h2>
              <h3>Easily assign and prioritize tasks, and see who's doing what anywhere, anytime.</h3>
            </div>
          </article>

        </div>
        <div className="boards-container">

        </div>
        <div className="footer">
          <h4>&copy; Cofferights 2021</h4>


        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    boards: state.boardModule.boards,
    loggedInUser: state.userModule.loggedInUser
  }
}
const mapDispatchToProps = {
  loadBoards,
  // loadBoard,
  //createBoard
}

export const Home = connect(mapStateToProps, mapDispatchToProps)(_Home)
