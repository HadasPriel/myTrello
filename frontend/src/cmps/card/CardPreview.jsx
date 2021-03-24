import React, { Component } from 'react'
import { connect } from 'react-redux';
import { removeCard } from '../../store/actions/boardActions.js'
import { CardLabelShowMin } from '../cardEdit/CardLabelShowMin'
import { CardEdit } from '../../pages/CardEdit'
import { Draggable } from 'react-beautiful-dnd'
import { ChecklistSign } from './ChecklistSign'
// import { CardCoverShowMin } from './CardCoverShowMin'
import { CardImgShow } from '../cardEdit/CardImgShow'
import { CardDuedateShowMin } from '../cardEdit/CardDuedateShowMin'
import { CardMembersShow } from '../cardEdit/CardMembersShow'

export class _CardPreview extends Component {

    state = {
        isCardEtidShow: false
    }


    onRemoveCard = (cardId) => {
        console.log('cardId to remove', cardId)
        this.props.removeCard(cardId, this.props.groupId, this.props.selectedBoard)
    }

    toggleCardEdit = () => {
        this.setState({ isCardEtidShow: !this.state.isCardEtidShow })
    }

    render() {
        const { card } = this.props
        const { isCardEtidShow } = this.state
        // const cardBgc = (card.style && card.style.coverType && card.style.coverType === 'full') ? `full ${card.style.bgColor}` : ''
        const cardBgc = (card.style?.coverType === 'full') ? `full ${card.style.bgColor}` : ''
        const cardCover = (card.style?.coverType === 'top' && card.style.bgColor) ? `top t${card.style.bgColor}` : ''
        return (


            <Draggable draggableId={String(card.id)} index={this.props.index} direction="horizontal" type="card">
                {(provided) => {
                    return (

                        <li key={card.id}  {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} className={(card.title !== 'default-empty') ? `` : `list-preview-empty`}>
                            <article className={(card.title !== 'default-empty') ? `card-preview ${cardBgc} ${cardCover}` : `card-preview-empty`}>
                                {/* {(card.style?.coverType === 'top') ? <CardCoverShowMin card={card} /> : ''} */}
                                {/* <button className="edit-fa" onClick={() => this.toggleCardEdit}></button> */}
                                <button className="edit-s" onClick={this.toggleCardEdit}></button>

                                {/* <button className="delete-s" onClick={() => this.onRemoveCard(card.id)}></button> */}
                                {card.labels && <CardLabelShowMin labels={card.labels} />}
                                <p onClick={this.toggleCardEdit}>{card.title}</p>
                                {card.img && <CardImgShow card={card} />}
                                <nav className="flex space-between flex-end">
                                    <span>
                                        {(card.description) ? <span className="descriptionSign sign"></span> : ''}
                                        {(card.checklists && card.checklists.length > 0) ? <ChecklistSign checklists={card.checklists} /> : ''}
                                        {(card.duedate) ? <CardDuedateShowMin card={card} /> : ''}
                                    </span>
                                    <span>
                                        {(card.members) ? <CardMembersShow members={card.members} /> : ''}
                                    </span>
                                </nav>
                                {isCardEtidShow && <CardEdit card={card} groupId={this.props.groupId} toggleCardEdit={this.toggleCardEdit} onRemoveCard={this.onRemoveCard} />}
                            </article>
                        </li>
                    )
                }}
            </Draggable>
        )
    }
}

const mapStateToProps = state => {
    return {
        selectedBoard: state.boardModule.selectedBoard
    };
};

const mapDispatchToProps = {
    removeCard

};

export const CardPreview = connect(mapStateToProps, mapDispatchToProps)(_CardPreview);