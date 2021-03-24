

import React, { Component } from 'react'
import { connect } from 'react-redux'

// import { socketService } from '../services/socketService'

class _EditLabelBar extends Component {
    state = {
        label: { title: '' }
    }

    componentDidMount() {
        const label = { ...this.props.label }
        console.log(label);
        this.setState({ label })
    }

    handleChange = async (ev) => {
        const label = { ...this.state.label }
        label[ev.target.name] = ev.target.value

        await this.setState({ label })

        const boardToSave = { ...this.props.board }
        boardToSave.labels = boardToSave.labels.map(currLabel => {
            if (currLabel.id !== label.id) return currLabel
            else return label
        })
        console.log(boardToSave);
        try {
            await this.props.updateBoard(boardToSave)
            // console.log(this.props.board)
        } catch (err) {
            console.log(err);
        }
    }

    render() {

        return (
            <section className="label-palette edit-bar">
                <header className="seconde">
                    <h3>Edit Label</h3>
                    <button onClick={this.props.toggleEditLabel}>x</button>
                </header>
                <main>
                    <label>Title
                    <input type="text" name="title" value={this.state.label.title} placeholder="Enter Title"
                            onChange={this.handleChange} autoComplete="off" required autoFocus ></input>
                    </label>
                </main>
            </section>

        )
    }
}

const mapStateToProps = state => {
    return {
    }
}
const mapDispatchToProps = {
}

export const EditLabelBar = connect(mapStateToProps, mapDispatchToProps)(_EditLabelBar)
