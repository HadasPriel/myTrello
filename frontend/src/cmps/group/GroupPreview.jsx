import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateBoard } from '../../store/actions/boardActions.js'
import { EditGroupTitle } from './EditGroupTitle'
import { CardList } from '../card/CardList'
import { AddCard } from './AddCard.jsx'
import { Draggable } from 'react-beautiful-dnd'
import { EditGroupNav } from './EditGroupNav'



export class _GroupPreview extends Component {

    state = {
        isOnAddCardMode: false,
        isEditMode: false,
        isEditGroupNavShow: false,
        // isOnAddGroupMode: false,
        title: '',
        groupHeight: 0
    }

    componentDidMount() {
        this.setState({ groupHeight: document.body.clientHeight })
    }

    onRemoveGroup = async (groupId, groupTitle) => {
        let boardToUpdate = JSON.parse(JSON.stringify(this.props.selectedBoard))
        let msg = `removed list titled ${groupTitle}`
        const updatedGroups = boardToUpdate.groups.filter(group => group.id !== groupId)
        boardToUpdate.groups = updatedGroups

        const board = await this.props.updateBoard(boardToUpdate, msg)
        // this.props.removeGroup(groupId, this.props.selectedBoard)
    }

    toggleEditMode = () => {

        this.setState({ isEditMode: !this.state.isEditMode })
    }
    toggleAddCardMode = () => {

        this.setState({ isOnAddCardMode: !this.state.isOnAddCardMode })
    }
    toggleEditGroupNav = () => {
        this.setState({ isEditGroupNavShow: !this.state.isEditGroupNavShow })
    }


    render() {
        const { isEditMode, isOnAddCardMode, isEditGroupNavShow } = this.state
        const { group } = this.props
        return (
            <Draggable draggableId={group.id} index={this.props.index}>
                {(provided) => {
                    return (
                        <li className="group" {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                            <article className="group-preview">
                                <div className="group-wraper" >
                                    <header>
                                        {(!isEditMode) ? <p onClick={this.toggleEditMode}>{group.title} </p> : <EditGroupTitle group={group} toggleEditMode={this.toggleEditMode} />}
                                        <button className="menu-group" onClick={() => this.toggleEditGroupNav(group.id)}></button>
                                        {isEditGroupNavShow && <EditGroupNav group={group} onRemoveGroup={this.onRemoveGroup} />}
                                    </header>
                                    <main style={{ maxHeight: `${this.state.groupHeight - 200}px` }}>
                                        <div className="main-group-wraper">
                                            {group.cards && <CardList groupId={group.id} cards={group.cards} />}
                                        </div>
                                    </main>
                                    {(!isOnAddCardMode) ? <p className="add-another-card" onClick={this.toggleAddCardMode}> Add another card</p> : <AddCard group={group} toggleAddCardMode={this.toggleAddCardMode} />}
                                </div>
                            </article>
                        </li>

                    )

                }}

            </Draggable>
        )
    }
}

const mapStateToProps = state => {
    return {
        selectedBoard: state.boardModule.selectedBoard
    };
};

const mapDispatchToProps = {
    updateBoard,

};

export const GroupPreview = connect(mapStateToProps, mapDispatchToProps)(_GroupPreview);
