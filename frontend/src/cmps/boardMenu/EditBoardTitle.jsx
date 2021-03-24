import React, { Component } from 'react'
import { connect } from 'react-redux';
import { updateBoard } from '../../store/actions/boardActions.js'

export class _EditBoardTitle extends Component {

    state = {
        title: ''
    }

    componentDidMount() {
        const { title } = this.props.selectedBoard
        this.setState({ title })
    }

    handleChange = (ev) => {
        const value = ev.target.value
        const field = ev.target.name
        this.setState({ [field]: value })
    }

    onSubmit = async (ev) => {
        ev.preventDefault()
        const { title } = this.state
        if (!title) return
        const board = { ...this.props.selectedBoard, title }
        await this.props.updateBoard(board, `changed board title to ${title}`)
        this.props.toggleEditMode()

    }

    render() {
        return (
            <div className="edit-board-title">
                <form onSubmit={this.onSubmit} >
                    <input className="new-title-input" placeholder="Board Title" type="text" onChange={this.handleChange} value={this.state.title} name="title" autoComplete="off" autoFocus />
                    <button className="add-btn">Save</button>
                </form>
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
    updateBoard
};

export const EditBoardTitle = connect(mapStateToProps, mapDispatchToProps)(_EditBoardTitle);