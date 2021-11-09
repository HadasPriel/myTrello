

import React, { Component } from 'react'


export class EditLabelBar extends Component {
    state = {
        label: { title: '' }
    }

    componentDidMount() {
        const label = { ...this.props.label }
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

        try {
            await this.props.updateBoard(boardToSave)
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
