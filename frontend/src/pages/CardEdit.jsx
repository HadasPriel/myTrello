import React, { Component } from 'react'
import { connect } from 'react-redux'

import { utilService } from '../services/utilService.js'
import { loadBoard, updateBoard } from '../store/actions/boardActions.js'
import { loadUsers } from '../store/actions/userActions.js'
import { CardEditNav } from '../cmps/cardEdit/CardEditNav'
import { AddDescription } from '../cmps/cardEdit/AddDescription'
import { CardLabelShow } from '../cmps/cardEdit/CardLabelShow'
import { CardChecklistShow } from '../cmps/cardEdit/CardChecklistShow'
import { CardDuedateShow } from '../cmps/cardEdit/CardDuedateShow'
import { CardImgShow } from '../cmps/cardEdit/CardImgShow'
import { CardMembersShow } from '../cmps/cardEdit/CardMembersShow'
import { CardActivitiesShow } from '../cmps/cardEdit/CardActivitiesShow'
import { DynamicNav } from '../cmps/cardEdit/DynamicNav.jsx'

class _CardEdit extends Component {
    state = {
        board: null,
        groupId: null,
        card: null,
        showingNav: null,
        isDescriptionShowing: false,
    }

    async componentDidMount() {
        try {
            this.loadCard()
            this.props.loadUsers()
        } catch (err) {
            console.log(err);
        }
    }

    componentDidUpdate(prevprops) {
        if (this.props.match !== prevprops.match) this.loadCard()
    }

    loadCard = async () => {
        const { groupId, cardId, selectedBoard } = this.props

        try {
            await this.props.loadBoard(selectedBoard._id)
            const groups = selectedBoard.groups
            const group = groups.find(group => group.id === groupId)
            const card = group.cards.find(currCard => currCard.id === cardId)
            this.setState({ board: selectedBoard, groupId, card })
        } catch (err) {
            console.log(err);
        }
    }

    updateCard = async (cardToSave, txt = '') => {
        const boardToSave = this.getUpdatedBoard(cardToSave)
        if (txt) {
            const activity = this.createActivity(txt)
            boardToSave.activities.unshift(activity)
        }
        try {
            await this.props.updateBoard(boardToSave)
            this.loadCard()

        } catch (err) {
            console.log('BoardActions: err in loadBoard', err)
        }
    }

    getUpdatedBoard = (cardToSave) => {
        const boardToSave = { ...this.props.selectedBoard }
        const groupToSave = boardToSave.groups.find(group => group.id === this.state.groupId)
        const cardsToSave = groupToSave.cards.map(card => {
            if (card.id === cardToSave.id) return cardToSave
            else return card
        })
        groupToSave.cards = cardsToSave
        const groupsToSave = boardToSave.groups.map(group => {
            if (group.id === groupToSave.id) return groupToSave
            else return group
        })
        boardToSave.groups = groupsToSave
        return boardToSave
    }

    createActivity = (txt) => {
        const { loggedInUser, card } = this.props
        const miniUser = (loggedInUser) ? { _id: loggedInUser._id, fullname: loggedInUser.fullname, imgUrl: loggedInUser.imgUrl } : { _id: '123', fullname: 'guest', imgUrl: 'https://res.cloudinary.com/ddgevj2yp/image/upload/v1610989052/avatar-1_kbr5un.jpg' }
        const miniCard = { id: card.id, title: card.title }
        const activity = { id: 'a' + utilService.makeId(), createdAt: Date.now(), txt, byMember: miniUser, card: miniCard }
        return activity
    }

    toggleShowingNav = (showingNav) => {
        this.setState({ showingNav })
    }
    toggleAddDescription = () => {
        this.setState({ isDescriptionShowing: !this.state.isDescriptionShowing })
    }




    addDeuDate = (date) => {
        const cardToSave = { ...this.props.card }
        cardToSave.duedate = date
        this.updateCard(cardToSave, `added due date`)
    }

    addImg = (img) => {
        const cardToSave = { ...this.props.card }
        cardToSave.img = img
        this.updateCard(cardToSave, 'added img')
    }

    stopProg = (ev) => {
        ev.stopPropagation();
    }


    render() {

        const { isDescriptionShowing } = this.state
        const { card, users, toggleCardEdit, onRemoveCard, selectedBoard } = this.props
        if (!card) return <div></div>

        const isLabels = (card.labels && card.labels.length > 0)
        const isDuedate = (card.duedate)
        const isMember = (card.members && card.members.length > 0)
        const coverShow = (card.style?.coverType) ? `top t${card.style.bgColor}` : ''
        const isImg = (card.img)

        return (
            <div className="screen" onClick={toggleCardEdit}>
                <section className={`card-edit ${coverShow}`} onClick={(ev) => { this.stopProg(ev) }}>
                    <header className="edit-header">
                        <button className="close" onClick={toggleCardEdit}></button>
                        <h1 className="title-sign">{card.title}</h1>
                    </header>

                    <div className="edit-container">
                        <main>
                            <div className="nav-mini-show show flex ">
                                <div >{isLabels && <div> <h5>Labels </h5> <CardLabelShow labels={card.labels} card={card} updateCard={this.updateCard} /></div>}</div>
                                <div >{isDuedate && <div className="duedate"> <h5>Due Date </h5> <CardDuedateShow duedate={card.duedate} card={card} updateCard={this.updateCard} /></div>}</div>
                                <div >{isMember && <div className="members"> <h5>Members </h5> <CardMembersShow members={card.members} card={card} updateCard={this.updateCard} /></div>}</div>
                            </div>
                            <h4 className="description-sign">Description </h4>
                            {(isDescriptionShowing) ? <AddDescription card={card} toggleAddDescription={this.toggleAddDescription} updateCard={this.updateCard} /> : ((card.description) ?
                                <div className="description show">{card.description} <button className="edit-btn" onClick={this.toggleAddDescription}>Edit</button></div> :
                                <div className="show description" onClick={this.toggleAddDescription}>add a more detailed description...</div>)}
                            <p>{card.description && ''}</p>
                            <div className="inline-block">{isImg && <div className="card-img"> <CardImgShow img={card.img} card={card} updateCard={this.updateCard} /></div>}</div>
                            <CardChecklistShow checklists={card.checklists} card={card} updateCard={this.updateCard} />
                            <h4 className="activity-sign">Activity</h4> <CardActivitiesShow activities={selectedBoard.activities} card={card} updateCard={this.updateCard} />
                        </main>
                        <div className="edit-list">
                            <DynamicNav showingNav={this.state.showingNav} toggleShowingNav={this.toggleShowingNav} card={card} updateCard={this.updateCard} board={selectedBoard} updateBoard={this.props.updateBoard} addDeuDate={this.addDeuDate} users={users} addImg={this.addImg} onRemoveCard={onRemoveCard} />
                        </div>
                        <CardEditNav toggleShowingNav={this.toggleShowingNav} card={card} toggleLabelPalette={this.toggleLabelPalette} toggleChecklistBar={this.toggleChecklistBar} toggleCoverBar={this.toggleCoverBar}
                            toggleAddDeutime={this.toggleAddDeutime} toggleAddImg={this.toggleAddImg} toggleAddMembers={this.toggleAddMembers} toggleDeleteCard={this.toggleDeleteCard} />
                    </div>

                </section>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        selectedBoard: state.boardModule.selectedBoard,
        users: state.userModule.users,
        loggedInUser: state.userModule.loggedInUser

    }
}
const mapDispatchToProps = {
    loadBoard,
    updateBoard,
    loadUsers
}

export const CardEdit = connect(mapStateToProps, mapDispatchToProps)(_CardEdit)
