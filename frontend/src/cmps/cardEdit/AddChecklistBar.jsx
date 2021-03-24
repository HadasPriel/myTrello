import React, { Component } from 'react'
import { connect } from 'react-redux'
import { utilService } from '../../services/utilService.js'

// import { socketService } from '../services/socketService'

class _AddChecklistBar extends Component {
    state = {
        checklist: { title: '', todos: [] }
    }

    handleChange = (ev) => {
        const checklist = { ...this.state.checklist }
        checklist[ev.target.name] = ev.target.value

        this.setState({ checklist })
    }

    onAddChecklist = (ev) => {
        ev.preventDefault()
        const checklist = { id: utilService.makeId(), ...this.state.checklist }
        const cardToSave = { ...this.props.card }
        cardToSave.checklists = (cardToSave.checklists) ? [...cardToSave.checklists, checklist] : [checklist]
        // console.log('cardToSave', cardToSave);
        this.props.updateCard(cardToSave, 'added checklist')
        this.setState({ checklist: { title: '', todos: [] } })
        this.props.toggleChecklistBar()
    }



    render() {

        return (
            <form className="edit-bar" onSubmit={this.onAddChecklist}>
                <header className="seconde">
                    <h3>Add Checklist</h3>
                    <button onClick={this.props.toggleChecklistBar}>x</button>

                </header>
                <main>
                    <label>Title
                    <input type="text" name="title" value={this.state.checklist.title} placeholder="Enter Title"
                            onChange={this.handleChange} autoComplete="off" required autoFocus ></input>
                    </label>
                    <button className="add-btn">Add</button>
                </main>
            </form>

        )
    }
}

const mapStateToProps = state => {
    return {
    }
}
const mapDispatchToProps = {
}

export const AddChecklistBar = connect(mapStateToProps, mapDispatchToProps)(_AddChecklistBar)