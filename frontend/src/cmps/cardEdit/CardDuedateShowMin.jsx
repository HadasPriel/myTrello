import React from 'react'


// import { socketService } from '../services/socketService'

export function CardDuedateShowMin(props) {

    // removeLable = (labelId) => {
    //     const cardToSave = { ...this.props.card }
    //     const labelsToSave = cardToSave.labels.filter(label => label.id !== labelId)
    //     cardToSave.labels = labelsToSave
    //     this.props.updateCard(cardToSave)
    // }

    const { card } = props
    const m = new Date(card.duedate).getMonth() + 1
    let month = ''
    switch (m) {
        case 1: month = 'Jan'; break;
        case 2: month = 'Feb'; break;
        case 3: month = 'Mar'; break;
        case 4: month = 'Apr'; break;
        case 5: month = 'May'; break;
        case 6: month = 'Jun'; break;
        case 7: month = 'Jul'; break;
        case 8: month = 'Aug'; break;
        case 9: month = 'Sep'; break;
        case 10: month = 'Oct'; break;
        case 11: month = 'Nov'; break;
        case 12: month = 'Dec'; break;
        default: break;
    }
    const day = card.duedate.substring(8, 10)
    const remainingTime = (new Date(card.duedate) - Date.now())
    const urgent = (remainingTime < 1000 * 60 * 60 * 24) ? 'urgent' : ''


    return (
        <span className="card-duedate-show">
            <span className={`duetime-fa duetime-fa-min ${urgent} `}>{` ${month} ${day}`}</span>
        </span>
    )
}


