import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BoardList } from '../cmps/board/BoardList'
import { AddBoard } from '../cmps/board/AddBoard'
import { loadBoards } from '../store/actions/boardActions.js'
import { HomeHeader } from '../cmps/HomeHeader'

class _Boards extends Component {
    state = {
        isNewBoard: false
    }

    componentDidMount() {
        this.props.loadBoards({ userId: '6004748cf9fd65ff47dc81e4' })
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

    render() {

        return (
            <React.Fragment>
                <HomeHeader loggedInUser={this.props.loggedInUser} />
                <div className="boards flex col ">
                    <h1>TASX</h1>
                    <h2>Get on Board</h2>
                    {/* <hr />
                    <img className="boards-image" src="https://res.cloudinary.com/ddgevj2yp/image/upload/v1611582232/tasx2_rjorq4.png" alt="" /> */}
                    <hr />
                    <section className="board-lists main-container">
                        {this.props.templatesBoards && <BoardList boards={this.props.templatesBoards} title="Templates boards" toggleNewBoard={this.toggleNewBoard} />}
                        <BoardList boards={this.props.boards} title="Personal boards" toggleNewBoard={this.toggleNewBoard} />
                    </section>
                    {this.state.isNewBoard && <AddBoard toggleNewBoard={this.toggleNewBoard} onLoadNewBoard={this.onLoadNewBoard} />}
                </div >
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        boards: state.boardModule.boards,
        templatesBoards: state.boardModule.templatesBoards,
        loggedInUser: state.userModule.loggedInUser
    }
}
const mapDispatchToProps = {
    loadBoards,
    // loadBoard,
    //createBoard
}

export const Boards = connect(mapStateToProps, mapDispatchToProps)(_Boards)