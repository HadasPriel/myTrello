import React from 'react'

export function DeleteCardBar(props) {

    const deleteCard = async () => {
        try {
            props.onRemoveCard(props.cardId)
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <form className="edit-bar" onSubmit={deleteCard}>
            <header className="seconde">
                <h3> Delete card?</h3>
                <button type="button" onClick={props.toggleDeleteCard}>x</button>

            </header>
            <main>
                <p>All actions will be removed from the activity feed and you won’t be able to re-open the card. There is no undo.</p>
                <button className="add-btn red">Delete</button>
            </main>
        </form>

    )

}
