import React, { Component } from 'react'
import { connect } from 'react-redux'

// import { socketService } from '../services/socketService'

class _DeleteCardBar extends Component {
    state = {
    }

    componentDidMount() {
        console.log(this.props);

    }


    deleteCard = async () => {
        try {
            this.props.onRemoveCard(this.props.cardId)
        } catch (err) {
            console.log(err);
        }
    }



    render() {

        return (
            <form className="edit-bar" onSubmit={this.deleteCard}>
                <header className="seconde">
                    <h3> Delete card?</h3>
                    <button onClick={this.props.toggleDeleteCard}>x</button>

                </header>
                <main>
                    <p>All actions will be removed from the activity feed and you won’t be able to re-open the card. There is no undo.</p>
                    <button className="add-btn red">Delete</button>
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

export const DeleteCardBar = connect(mapStateToProps, mapDispatchToProps)(_DeleteCardBar)
