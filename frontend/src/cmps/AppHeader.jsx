import { Link } from 'react-router-dom'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BoardFilter } from './board/BoardFilter'


class _AppHeader extends Component {

    state = {
        userImgStyle: {
            backgroundImage: "url(https://res.cloudinary.com/ddgevj2yp/image/upload/v1610989052/avatar-1_kbr5un.jpg"
        }
    }

    componentDidMount() {
        if (!this.props.loggedInUser) return
        const userImgUrl = this.props.loggedInUser.imgUrl
        let userImgStyle = {
            backgroundImage: `url(${userImgUrl})`
        }
        this.setState({ userImgStyle })
    }



    render() {
        const { selectedBoard, toggleSideMenu, toggleDashboard } = this.props
        return (
            <div className="main-header">
                <header className="app-header flex space-between align-center">
                    <nav>
                        <Link to="/" className="header-home"></Link>
                        <Link to="/board" className="header-board"> Boards </Link>
                        <span className=" normal-media">
                            <label>
                                {/* <input className="header-filter"></input> */}
                                <BoardFilter />
                            </label>
                        </span>
                    </nav>
                    <h3 className="header-logo">TASX</h3>

                    <nav className="navbar-links flex space-between align-center">
                        <button className="header-about-us normal-media"> About Us</button>
                        <span className="user-img" style={this.state.userImgStyle}></span>
                    </nav>
                    {/* <button className="user-avatar">HS</button> */}
                </header>
                <header className="narrow-media app-header flex space-between align-center">
                    <span>
                        <label>
                            {/* <input className="header-filter"></input> */}
                            <BoardFilter />
                        </label>
                    </span>
                    <button className="header-about-us"> About Us</button>

                </header>
                <header className="app-header board-header flex space-between align-center">
                    <nav>
                        <h5>{selectedBoard.title}</h5>
                    </nav>

                    <nav className="navbar-links  ">
                        <button className="header-invite" onClick={toggleDashboard}>Statistics</button>
                        <button className="header-show-menu" onClick={toggleSideMenu}> Show Menu</button>

                    </nav>
                    {/* <button className="user-avatar">HS</button> */}

                </header>
            </div>
        )

    }
}


const mapStateToProps = state => {
    return {
        selectedBoard: state.boardModule.selectedBoard,
        loggedInUser: state.userModule.loggedInUser
    }
}
const mapDispatchToProps = {

}

export const AppHeader = connect(mapStateToProps, mapDispatchToProps)(_AppHeader)