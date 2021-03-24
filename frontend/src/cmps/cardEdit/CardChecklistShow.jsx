import React, { Component } from 'react'
import { connect } from 'react-redux'
import { TodoListShow } from './TodoListShow'

// import { socketService } from '../services/socketService'
import { utilService } from '../../services/utilService.js'

class _CardChecklistShow extends Component {
    state = {
        todo: { txt: '', isDone: false },
        progress: 0
    }
    componentDidMount() {
        this.getProgress()
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps !== this.props) {
            this.getProgress()
        }
    }


    removeChecklist = (checklistId) => {
        // const labelsToSave = this.props.labels.filter(label => label.id !== labelId)
        const cardToSave = { ...this.props.card }
        const checklistsToSave = cardToSave.checklists.filter(checklist => checklist.id !== checklistId)

        cardToSave.checklists = checklistsToSave
        console.log('cardToSave', cardToSave);
        this.props.updateCard(cardToSave)
    }

    handleTaskChange = (ev) => {
        const todo = { ...this.state.todo }
        if (ev.target.name === 'isDone') todo.isDone = ev.target.checked
        else todo[ev.target.name] = ev.target.value

        this.setState({ todo })
    }

    addTask = (ev, checklistId) => {
        ev.preventDefault()

        const todo = { ...this.state.todo, id: utilService.makeId() }
        const cardToSave = { ...this.props.card }
        const checklistToSave = cardToSave.checklists.find(checklist => checklist.id === checklistId)
        checklistToSave.todos = (checklistToSave.todos) ? [...checklistToSave.todos, todo] : [todo]
        const checklistsToSave = cardToSave.checklists.map(checklist => {
            if (checklist.id === checklistId) return checklistToSave
            else return checklist
        })
        cardToSave.checklists = checklistsToSave

        console.log('cardToSave', cardToSave);
        this.props.updateCard(cardToSave)
            .then(this.setState({ todo: { txt: '', isDone: false } }))
    }


    removeTodo = (todoId, checklistId) => {
        const cardToSave = { ...this.props.card }
        const checklistIndex = cardToSave.checklists.findIndex(checklist => checklist.id === checklistId)
        const todoToSave = cardToSave.checklists[checklistIndex].todos.filter(todo => todo.id !== todoId)
        cardToSave.checklists[checklistIndex].todos = todoToSave
        this.props.updateCard(cardToSave)
    }

    getProgress = () => {
        let done = 0
        let all = 0
        this.props.checklists.forEach(Checklist => {
            Checklist.todos.forEach(todo => {
                if (todo.isDone === true) done++
                all++
            })
        })
        const progress = Math.round(done / all * 100)
        this.setState({ progress })
    }

    render() {
        const { todo, progress } = this.state
        const done = (progress === 100) ? 'done' : ''
        return (
            <ul className="card-checklist-show card-show ">
                {/* <progress value={progress.done} max={progress.all}> </progress> */}
                <div className="show flex align-center">
                    <span>{`${progress}%`}</span>
                    <div className="progress-wraper"><div className={`progress-inner ${done}`} style={{ width: `${progress}%` }}></div></div>
                </div>
                {this.props.checklists.map(checklist => {
                    return (
                        <li key={checklist.id} className="checklist-wraper" >
                            <header className="flex space-between">
                                <h4 className="checklist-title" > {checklist.title}</h4>
                                <button className="edit-btn" onClick={() => { this.removeChecklist(checklist.id) }}>Delete</button>
                            </header>
                            <TodoListShow checklist={checklist} card={this.props.card} updateCard={this.props.updateCard}
                                removeTodo={this.removeTodo} />
                            <form onSubmit={(event) => { this.addTask(event, checklist.id) }}>
                                <input type="text" name="txt" value={todo.txt} onChange={this.handleTaskChange}
                                    placeholder="Add an item" autoComplete="off" required></input>
                                <button className="add-btn">Add</button>
                                {/* <button className="add-btn" onClick>X</button> */}
                            </form>
                        </li>

                    )
                })}
            </ul>
        )
    }

}

const mapStateToProps = state => {
    return {
    }
}
const mapDispatchToProps = {
}

export const CardChecklistShow = connect(mapStateToProps, mapDispatchToProps)(_CardChecklistShow)
