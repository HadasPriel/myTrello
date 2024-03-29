import React, { Component } from 'react'
import { EditLabelBar } from './EditLabelBar'

export class LabelPalette extends Component {
    state = {
        isEditLabelShow: false,
        labelToEdit: null
    }

    addLable = (label) => {
        const cardToSave = { ...this.props.card }
        if (!cardToSave.labels) cardToSave.labels = [label]
        else {
            const alredyOnCard = cardToSave.labels.find(currLabel => currLabel.id === label.id)
            if (alredyOnCard) cardToSave.labels = cardToSave.labels.filter(currLabel => currLabel.id !== label.id)
            else cardToSave.labels.push(label)
        }
        this.props.updateCard(cardToSave, 'added label')
    }

    toggleEditLabel = () => {
        this.setState({ isEditLabelShow: !this.state.isEditLabelShow })
    }

    openEditLabel = async (label) => {
        await this.setState({ labelToEdit: label })
        this.toggleEditLabel()
    }

    render() {
        return (
            <section className="label-palette edit-bar">
                <header className="seconde">
                    <h3>Labels</h3>
                    <button onClick={this.props.toggleLabelPalette}>x</button>
                </header>
                <main>
                    <ul>
                        {this.props.board.labels.map(label => {
                            const alredyOnCard = (this.props.card.labels?.find(currLabel => currLabel.id === label.id)) ? 'alredyOnCard' : ''
                            return (
                                <li key={label.id} >
                                    <div className={`${label.id}`} onClick={() => { this.addLable(label) }}>{label.title} <span className={`${alredyOnCard}`}></span></div>
                                    <button className="open-edit-label" onClick={() => { this.openEditLabel(label) }}></button>
                                </li>)
                        })}

                        {this.state.isEditLabelShow && <EditLabelBar toggleEditLabel={this.toggleEditLabel} label={this.state.labelToEdit} board={this.props.board} updateBoard={this.props.updateBoard} />}
                    </ul>
                </main>
            </section>

        )
    }
}

