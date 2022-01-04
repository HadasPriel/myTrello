import React from 'react'
import { AddDescription } from './AddDescription'


export function CardDescriptionShow({ isDescriptionShowing, card, toggleAddDescription, updateCard }) {


    return (
        <div className="card-img">
            {(isDescriptionShowing) ? <AddDescription card={card} toggleAddDescription={toggleAddDescription} updateCard={updateCard} /> : ((card.description) ?
                <div className="description show">{card.description} <button className="edit-btn" onClick={toggleAddDescription}>Edit</button></div> :
                <div className="show description" onClick={toggleAddDescription}>add a more detailed description...</div>)}
        </div>
    )
}
