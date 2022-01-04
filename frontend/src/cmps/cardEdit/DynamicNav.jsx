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
            var cmp = <LabelPalette card={card} updateCard={updateCard} board={board} updateBoard={updateBoard} toggleLabelPalette={closeNav} />
            break
        case 'checklist':
            cmp = <AddChecklistBar card={card} updateCard={updateCard} toggleChecklistBar={closeNav} />
            break
        case 'cover':
            cmp = <AddCoverBar card={card} updateCard={updateCard} toggleCoverBar={closeNav} />
            break
        case 'dueTime':
            cmp = <AddDeutimeBar card={card} updateCard={updateCard} addDeuDate={addDeuDate} toggleAddDeutime={closeNav} />
            break
        case 'members':
            cmp = <AddMembersBar card={card} updateCard={updateCard} users={users} toggleAddMembers={closeNav} />
            break
        case 'delete':
            cmp = <DeleteCardBar cardId={card.id} boardId={board._id} onRemoveCard={onRemoveCard} toggleDeleteCard={closeNav} />
            break
        case 'img':
            cmp = <AddImgBar card={card} updateCard={updateCard} toggleAddImg={closeNav} addImg={addImg} />
            break

        default:
            cmp = <div></div>
    }

    return (
        <div className="edit-list">
            {cmp}
        </div>
    )

}