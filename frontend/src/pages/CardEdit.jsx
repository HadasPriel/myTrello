import React, { Component } from 'react'
import { connect } from 'react-redux'

import { utilService } from '../services/utilService.js'
import { loadBoard, updateBoard } from '../store/actions/boardActions.js'
import { loadUsers } from '../store/actions/userActions.js'
import { CardEditNav } from '../cmps/cardEdit/CardEditNav'
import { CardLabelShow } from '../cmps/cardEdit/CardLabelShow'
import { CardChecklistShow } from '../cmps/cardEdit/CardChecklistShow'
import { CardDuedateShow } from '../cmps/cardEdit/CardDuedateShow'
import { CardImgShow } from '../cmps/cardEdit/CardImgShow'
import { CardMembersShow } from '../cmps/cardEdit/CardMembersShow'
import { CardActivitiesShow } from '../cmps/cardEdit/CardActivitiesShow'
import { DynamicNav } from '../cmps/cardEdit/DynamicNav.jsx'
import { CardDescriptionShow } from '../cmps/cardEdit/CardDescriptionShow.jsx'

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
        try {
            const { groupId, cardId, selectedBoard } = this.props
            await this.props.loadBoard(selectedBoard._id)
            const group = selectedBoard.groups.find(group => group.id === groupId)
            const card = group.cards.find(currCard => currCard.id === cardId)
            this.setState({ board: selectedBoard, groupId, card })
        } catch (err) {
            console.log(err);
        }
    }

    updateBoard = async (cardToSave, txt = '') => {
        try {
            const boardToSave = this.updateCard(cardToSave)
            if (txt) {
                const activity = this.createActivity(txt)
                boardToSave.activities.unshift(activity)
            }
            await this.props.updateBoard(boardToSave)
            this.loadCard()

        } catch (err) {
            console.log('err in updateCard', err)
        }
    }

    updateCard = (cardToSave) => {
        return {
            ...this.props.selectedBoard,
            groups: this.props.selectedBoard.groups.map(group => {
                if (group.id === this.state.groupId) {
                    group.cards = group.cards.map(card => {
                        if (card.id === cardToSave.id) return cardToSave
                        else return card
                    })
                }
                return group
            })
        }
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
        this.updateBoard(cardToSave, `added due date`)
    }

    addImg = (img) => {
        const cardToSave = { ...this.props.card }
        cardToSave.img = img
        this.updateBoard(cardToSave, 'added img')
    }

    stopProg = (ev) => {
        ev.stopPropagation();
    }


    render() {
        const { isDescriptionShowing } = this.state
        const { card, users, toggleCardEdit, onRemoveCard, selectedBoard } = this.props
        if (!card) return <div></div>

        const isLabels = (card.labels?.length > 0)
        const isDuedate = (card.duedate)
        const isMember = (card.members?.length > 0)
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
                                {isLabels && <CardLabelShow labels={card.labels} card={card} updateCard={this.updateBoard} />}
                                {isDuedate && <CardDuedateShow duedate={card.duedate} card={card} updateCard={this.updateBoard} />}
                                {isMember && <CardMembersShow members={card.members} card={card} isBig={true} updateCard={this.updateBoard} />}
                            </div>
                            <h4 className="description-sign">Description </h4>
                            <CardDescriptionShow isDescriptionShowing={isDescriptionShowing} card={card} toggleAddDescription={this.toggleAddDescription} updateCard={this.updateBoard} />
                            <p>{card.description && ''}</p>
                            {isImg && <CardImgShow img={card.img} card={card} updateCard={this.updateBoard} />}
                            <CardChecklistShow checklists={card.checklists} card={card} updateCard={this.updateBoard} />
                            <CardActivitiesShow activities={selectedBoard.activities} card={card} updateCard={this.updateBoard} />
                        </main>

                        <DynamicNav showingNav={this.state.showingNav} toggleShowingNav={this.toggleShowingNav} card={card} updateCard={this.updateBoard} board={selectedBoard} updateBoard={this.props.updateBoard} addDeuDate={this.addDeuDate} users={users} addImg={this.addImg} onRemoveCard={onRemoveCard} />

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
