
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { AddCard } from './AddCard.jsx'
import { RemoveList } from './RemoveList'


export class _EditGroupNav extends Component {

    state = {
        isOnAddCardMode: false,
        isDeleteBarShow: false
    }


    toggleDeleteBar = () => {
        this.setState({ isDeleteBarShow: !this.state.isDeleteBarShow })
    }

   
    toggleAddCardMode = () => {

        this.setState({ isOnAddCardMode: !this.state.isOnAddCardMode })
    }

    render() {
        const { onRemoveGroup } = this.props
        const { isDeleteBarShow } = this.state
        const { isOnAddCardMode } = this.state
        const { group } = this.props
        return (
            <React.Fragment>
                < nav className="edit-group-container">
                    {(!isOnAddCardMode) ? <button onClick={this.toggleAddCardMode}>Add another card...</button> : <AddCard group={group} toggleAddCardMode={this.toggleAddCardMode} />}
                    {(!isDeleteBarShow) ? <button onClick={this.toggleDeleteBar}>Delete this list...</button> : <RemoveList group={group} toggleDeleteBar={this.toggleDeleteBar} onRemoveGroup={onRemoveGroup} />}
                    
                </nav >
            </React.Fragment>
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

export const EditGroupNav = connect(mapStateToProps, mapDispatchToProps)(_EditGroupNav);
