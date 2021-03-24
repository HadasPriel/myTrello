import React, { Component } from 'react'
import { connect } from 'react-redux'
import { GroupPreview } from './GroupPreview.jsx'
import { AddNewGroup } from './AddNewGroup.jsx'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'

export class _GroupList extends Component {
    state = {
        isOnAddGroupMode: false,
    }
    toggleAddGroupMode = () => {
        this.setState({ isOnAddGroupMode: !this.state.isOnAddGroupMode })
    }
    render() {
        const { isOnAddGroupMode } = this.state
        return (
            <DragDropContext onDragEnd={this.props.onDragEnd}>
                <section className="group-list-container">
                    <Droppable droppableId={'moveGroups'} direction="horizontal" type="group">
                        {(provided) => (
                            <ul className="group-list clean-list" {...provided.droppableProps} ref={provided.innerRef}>
                                {this.props.groups.map((group, index) =>
                                    <GroupPreview key={group.id} group={group} index={index} />
                                )}
                                {provided.placeholder}
                            </ul>
                        )}
                    </Droppable>
                    {(!isOnAddGroupMode) ? <p className="add-another-list" onClick={this.toggleAddGroupMode}> Add another list</p> : <AddNewGroup boardId={this.props.boardId} toggleAddGroupMode={this.toggleAddGroupMode} />}
                </section>
            </DragDropContext>
        )
    }
}
const mapStateToProps = state => {
    return {
    };
};
const mapDispatchToProps = {
};
export const GroupList = connect(mapStateToProps, mapDispatchToProps)(_GroupList);
