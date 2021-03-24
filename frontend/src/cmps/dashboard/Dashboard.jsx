import React, { Component } from 'react'
import { connect } from 'react-redux'
import { PieBoard } from './PieBoard'
import { BarBoard } from './BarBoard'
import { LineBoard } from './LineBoard'
import { BarLabels } from './BarLabels'


class _Dashboard extends Component {

    state = {
        todos: '',
        cardSum: 0
    }

    componentDidMount() {
        this.todosAndCardsSum()
    }

    todosAndCardsSum = () => {
        let total = 0
        let complited = 0
        let cardSum = 0
        this.props.selectedBoard.groups.forEach(group => {
            group.cards?.forEach(card => {
                cardSum++
                card.checklists.forEach(checklist => {
                    checklist.todos.forEach(todo => {
                        total++
                        if (todo.isDone) complited++
                    })
                })
            })
        })
        this.setState({ todos: `${complited} / ${total}`, cardSum })
    }

    render() {
        const board = this.props.selectedBoard
        const { toggleDashboard } = this.props
        const { todos, cardSum } = this.state
        const membersSum = board.members.length

        return (
            <section className="dashboard">
                <header>
                    <h1>Board Statistics</h1>
                    <button className="close-menu" onClick={toggleDashboard}>x</button>
                </header>
                <main className="menu-container">
                    <div className="summery">
                        <p><span>{membersSum}</span> Total members</p>
                        <p><span>{todos}</span> Checked todos</p>
                        <p><span>{cardSum}</span> Total Cards on board</p>
                    </div>
                    <div className="data">
                        <PieBoard board={board} />
                        <BarBoard board={board} />
                        <BarLabels board={board} />
                        <LineBoard board={board} />
                    </div>
                </main>
            </section>
        )
    }
}

const mapStateToProps = state => {
    return {
        selectedBoard: state.boardModule.selectedBoard,

    }
}

const mapDispatchToProps = {
}

export const Dashboard = connect(mapStateToProps, mapDispatchToProps)(_Dashboard)
