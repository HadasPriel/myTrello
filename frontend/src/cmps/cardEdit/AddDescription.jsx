import React, { Component } from 'react'
import { connect } from 'react-redux'

// import { socketService } from '../services/socketService'

class _AddDescription extends Component {
    state = {
        description: { txt: '' }
    }

    componentDidMount() {
        const description = (this.props.card.description) ? this.props.card.description : ''
        this.setState({ description: { txt: description } })
    }


    handleChange = (ev) => {
        const description = { ...this.state.description }
        description[ev.target.name] = ev.target.value

        this.setState({ description })
    }

    onAddDescription = async (ev) => {
        ev.preventDefault()
        const newDescription = { ...this.state.description }
        const cardToSave = { ...this.props.card }
        cardToSave.description = newDescription.txt
        try {
            await this.props.updateCard(cardToSave)
            this.props.toggleAddDescription()
        } catch (err) {
            console.log(err);
        }
        // this.setState({ description: { txt: '' } })
        // 
    }


    render() {
        const { description } = this.state
        return (
            <form className="add-description show" onSubmit={this.onAddDescription}>
                <textarea name="txt" value={description.txt}
                    placeholder="add a more detailed description..." onChange={this.handleChange} ></textarea>
                <button className="add-btn">Add</button>
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

export const AddDescription = connect(mapStateToProps, mapDispatchToProps)(_AddDescription)
