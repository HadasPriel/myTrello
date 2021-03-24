import React, { Component } from 'react'
import { connect } from 'react-redux'
import { utilService } from '../../services/utilService.js'

// import { socketService } from '../services/socketService'

class _LabelPalette extends Component {


    addLable = (color) => {
        const label = { id: utilService.makeId(), title: '', color }
        const cardToSave = { ...this.props.card }
        cardToSave.labels = (cardToSave.labels) ? [...cardToSave.labels, label] : [label]
        // console.log('cardToSave', cardToSave);
        this.props.updateCard(cardToSave, 'added label')
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
                        <li key="#61BD4F" onClick={() => { this.addLable("#61BD4F") }} className="#61BD4F"></li>
                        <li key="#F2D600" onClick={() => { this.addLable("#F2D600") }} className="#F2D600"></li>
                        <li key="#FF9F1A" onClick={() => { this.addLable("#FF9F1A") }} className="#FF9F1A"></li>
                        <li key="#EB5A46" onClick={() => { this.addLable("#EB5A46") }} className="#EB5A46"></li>
                        <li key="#C377E0" onClick={() => { this.addLable("#C377E0") }} className="#C377E0"></li>
                        <li key="#0079BF" onClick={() => { this.addLable("#0079BF") }} className="#0079BF"></li>
                    </ul>
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

export const LabelPalette = connect(mapStateToProps, mapDispatchToProps)(_LabelPalette)
