import React, { Component } from 'react'
import { connect } from 'react-redux';
import { updateGroup } from '../../store/actions/boardActions.js'

export class _EditGroupTitle extends Component {

    state = {
        title: ''
    }

    componentDidMount() {
        const { title } = this.props.group
        this.setState({ title })
    }

    handleChange = (ev) => {
        const value = ev.target.value
        const field = ev.target.name
        this.setState({ [field]: value })
    }

    onSubmit = async (ev) => {
        ev.preventDefault()
        if (!this.state.title) return
        await this.props.updateGroup(this.state.title, this.props.group.id, this.props.selectedBoard)
        this.props.toggleEditMode()

    }

    render() {
        return (
            <div className="edit-group-title">
                <form onSubmit={this.onSubmit} >
                    <input className="new-title-input" placeholder="Group Title" type="text" onChange={this.handleChange} value={this.state.title} name="title" autoComplete="off"/>
                    <button className="save-btn">Save</button>
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
    updateGroup,

};

export const EditGroupTitle = connect(mapStateToProps, mapDispatchToProps)(_EditGroupTitle);