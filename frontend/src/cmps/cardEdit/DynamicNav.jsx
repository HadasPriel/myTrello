import React from 'react'
import { AddChecklistBar } from './AddChecklistBar'
import { AddCoverBar } from './AddCoverBar'
import { AddDeutimeBar } from './AddDeutimeBar'
import { AddImgBar } from './AddImgBar'
import { AddMembersBar } from './AddMembersBar'
import { DeleteCardBar } from './DeleteCardBar'
import { LabelPalette } from './LabelPalette'


export function DynamicNav(props) {
    const { showingNav, toggleShowingNav, card, updateCard, board, updateBoard, addDeuDate, users, addImg, onRemoveCard } = props

    const closeNav = () => { toggleShowingNav(null) }

    switch (showingNav) {
        case 'labelPalette':
            return <LabelPalette card={card} updateCard={updateCard} board={board} updateBoard={updateBoard} toggleLabelPalette={closeNav} />
        case 'checklist':
            return <AddChecklistBar card={card} updateCard={updateCard} toggleChecklistBar={closeNav} />
        case 'cover':
            return <AddCoverBar card={card} updateCard={updateCard} toggleCoverBar={closeNav} />
        case 'dueTime':
            return <AddDeutimeBar card={card} updateCard={updateCard} addDeuDate={addDeuDate} toggleAddDeutime={closeNav} />
        case 'members':
            return <AddMembersBar card={card} updateCard={updateCard} users={users} toggleAddMembers={closeNav} />
        case 'delete':
            return <DeleteCardBar cardId={card.id} boardId={board._id} onRemoveCard={onRemoveCard} toggleDeleteCard={closeNav} />
        case 'img':
            return <AddImgBar card={card} updateCard={updateCard} toggleAddImg={closeNav} addImg={addImg} />

        default:
            return <div></div>
    }

}