import React, { Component } from 'react'
import { connect } from 'react-redux'
import { EditBoardTitle } from './EditBoardTitle'



export class _AboutBoard extends Component {

    state = {
        isEditMode: false,

    }

    toggleEditMode = () => {
        this.setState({ isEditMode: !this.state.isEditMode })
    }

    render() {
        const { isEditMode } = this.state
        const { selectedBoard } = this.props
        return (
            <div className="about-board-container side-menu-sub-item">
                <header>
                    <h1>About this board</h1>
                    <button className="close-menu" onClick={this.props.toggleAboutBoard}>x</button>
                </header>
                <main className="menu-container">
                    <section>
                        <p className="menu-item made-by"> Made by </p>
                        <div className="flex align-center">
                            <div className="user-img sub inline-block" style={{ backgroundImage: `url(${selectedBoard.createdBy.imgUrl})` }}></div>
                            <span>{selectedBoard.createdBy.username} </span>
                        </div>
                    </section>
                    <section>
                        <p className="menu-item board-name">Board name <span className="board-name-edit">click to edit</span></p>

                        {(!isEditMode) ? <p className="board-name-edit" onClick={this.toggleEditMode}> {selectedBoard.title} </p> : <EditBoardTitle toggleEditMode={this.toggleEditMode} />}
                        {/* <button onClick={() => { this.props.toggleAboutBoard() }}>Back to Menu</button> */}
                    </section>
                </main>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        selectedBoard: state.boardModule.selectedBoard
    };
};

const mapDispatchToProps = {


};

export const AboutBoard = connect(mapStateToProps, mapDispatchToProps)(_AboutBoard);


