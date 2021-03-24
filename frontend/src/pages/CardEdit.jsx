import React, { Component } from 'react'
import { connect } from 'react-redux'

// import { socketService } from '../services/socketService'
import { utilService } from '../services/utilService.js'
import { loadBoard, updateBoard } from '../store/actions/boardActions.js'
import { loadUsers } from '../store/actions/userActions.js'
import { CardEditNav } from '../cmps/cardEdit/CardEditNav'
import { AddDescription } from '../cmps/cardEdit/AddDescription'
import { LabelPalette } from '../cmps/cardEdit/LabelPalette'
import { AddChecklistBar } from '../cmps/cardEdit/AddChecklistBar'
import { AddCoverBar } from '../cmps/cardEdit/AddCoverBar'
import { CardLabelShow } from '../cmps/cardEdit/CardLabelShow'
import { CardChecklistShow } from '../cmps/cardEdit/CardChecklistShow'
import { AddDeutimeBar } from '../cmps/cardEdit/AddDeutimeBar'
import { CardDuedateShow } from '../cmps/cardEdit/CardDuedateShow'
import { AddImgBar } from '../cmps/cardEdit/AddImgBar'
import { CardImgShow } from '../cmps/cardEdit/CardImgShow'
import { AddMembersBar } from '../cmps/cardEdit/AddMembersBar'
import { CardMembersShow } from '../cmps/cardEdit/CardMembersShow'
import { CardActivitiesShow } from '../cmps/cardEdit/CardActivitiesShow'
import { DeleteCardBar } from '../cmps/cardEdit/DeleteCardBar'

class _CardEdit extends Component {
    state = {
        board: null,
        groupId: null,
        card: null,
        isDescriptionShowing: false,
        isLabelPaletteShowing: false,
        isAddChecklistShowing: false,
        isCoverShowing: false,
        isAddDeutimeShowing: false,
        isAddImgShowing: false,
        isAddMembersShowing: false,
        isDeleteCardShowing: false,
        isActivitiesShowing: true
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
        const boardId = this.props.selectedBoard._id
        const groupId = this.props.groupId
        const cardId = this.props.card.id
        try {
            await this.props.loadBoard(boardId)
            const groups = this.props.selectedBoard.groups
            const group = groups.find(group => group.id === groupId)
            const card = group.cards.find(currCard => currCard.id === cardId)
            this.setState({ board: this.props.selectedBoard, groupId, card })
        } catch (err) {
            console.log(err);
        }
    }

    updateCard = async (cardToSave, txt = '') => {
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
        if (txt) {
            const activity = this.createActivity(txt)
            boardToSave.activities.unshift(activity)
        }
        try {
            // await updateBoard(boardToSave)
            await this.props.updateBoard(boardToSave)
            this.loadCard()

        } catch (err) {
            console.log('BoardActions: err in loadBoard', err)
        }
    }

    createActivity = (txt) => {
        const { loggedInUser, card } = this.props
        const miniUser = (loggedInUser) ? { _id: loggedInUser._id, fullname: loggedInUser.fullname, imgUrl: loggedInUser.imgUrl } : { _id: '123', fullname: 'guest', imgUrl: 'https://res.cloudinary.com/ddgevj2yp/image/upload/v1610989052/avatar-1_kbr5un.jpg' }
        const miniCard = { id: card.id, title: card.title }
        const activity = { id: 'a' + utilService.makeId(), createdAt: Date.now(), txt, byMember: miniUser, card: miniCard }
        return activity
    }

    toggleLabelPalette = () => {
        this.setState({ isLabelPaletteShowing: !this.state.isLabelPaletteShowing })
    }
    toggleChecklistBar = () => {
        this.setState({ isAddChecklistShowing: !this.state.isAddChecklistShowing })
    }
    toggleCoverBar = () => {
        this.setState({ isCoverShowing: !this.state.isCoverShowing })
    }
    toggleAddDescription = () => {
        this.setState({ isDescriptionShowing: !this.state.isDescriptionShowing })
    }
    toggleAddDeutime = () => {
        this.setState({ isAddDeutimeShowing: !this.state.isAddDeutimeShowing })
    }
    toggleAddMembers = () => {
        this.setState({ isAddMembersShowing: !this.state.isAddMembersShowing })
    }

    toggleAddImg = () => {
        this.setState({ isAddImgShowing: !this.state.isAddImgShowing })
    }

    toggleDeleteCard = () => {
        this.setState({ isDeleteCardShowing: !this.state.isDeleteCardShowing })
    }

    addDeuDate = (date) => {
        const cardToSave = { ...this.props.card }
        cardToSave.duedate = date
        this.updateCard(cardToSave, `added due date`)
        // this.updateCard(cardToSave, `set card to be due at ${date}`)
    }

    addImg = (img) => {
        const cardToSave = { ...this.props.card }
        cardToSave.img = img
        this.updateCard(cardToSave, 'added img')
        // console.log('card to save:', cardToSave)
    }

    stopProg = (ev) => {
        ev.stopPropagation();
    }


    render() {
        const { isDescriptionShowing, isActivitiesShowing } = this.state
        const { card, users, toggleCardEdit, onRemoveCard, selectedBoard } = this.props
        const isLabels = (card && card.labels && card.labels.length > 0)
        const isChecklists = (card && card.checklists && card.checklists.length > 0)
        const isDuedate = (card && card.duedate)
        const isMember = (card && card.members && card.members.length > 0)
        const coverShow = (card && card.style?.coverType) ? `top t${card.style.bgColor}` : ''
        const isImg = (card && card.img)


        if (!card) return <div></div>
        return (
            <React.Fragment>
                <div className="screen" onClick={toggleCardEdit}>
                    <div onClick={(ev) => { this.stopProg(ev) }} >
                        {/* <section className="card-edit"> */}
                        <section className={`card-edit ${coverShow}`}>
                            {/* {(card.style && card.style.coverType && card.style.bgColor) ? <CardCoverShow card={card} /> : ''} */}
                            <header className="edit-header">
                                <button className="close" onClick={toggleCardEdit}></button>
                                <h1 className="title-sign">{card.title}</h1>
                            </header>

                            <div className="permanent">
                                <main>
                                    <div className="nav-mini-show show flex ">
                                        <div className=" inline-block">{isLabels && <div> <h5>Labels </h5><CardLabelShow labels={card.labels} card={card} updateCard={this.updateCard} /></div>}</div>
                                        <div className="inline-block">{isDuedate && <div className="duedate"> <h5>Due Date </h5> <CardDuedateShow duedate={card.duedate} card={card} updateCard={this.updateCard} /></div>}</div>
                                        <div className="inline-block">{isMember && <div className="members"> <h5>Members </h5> <CardMembersShow members={card.members} card={card} updateCard={this.updateCard} /></div>}</div>
                                        {/* <div className="inline-block">{isImg && <div className="card-img"> <CardImgShow img={card.img} card={card} updateCard={this.updateCard} /></div>}</div> */}
                                    </div>
                                    <h4 className="description-sign">Description </h4>
                                    {(isDescriptionShowing) ? <AddDescription card={card} toggleAddDescription={this.toggleAddDescription} updateCard={this.updateCard} /> : ((card.description) ?
                                        <div className="description show">{card.description} <button className="edit-btn" onClick={this.toggleAddDescription}>Edit</button></div> :
                                        <div className="show description" onClick={this.toggleAddDescription}>add a more detailed description...</div>)}
                                    <p>{card.description && ''}</p>
                                    <div className="inline-block">{isImg && <div className="card-img"> <CardImgShow img={card.img} card={card} updateCard={this.updateCard} /></div>}</div>
                                    <div>{isChecklists && <div><CardChecklistShow checklists={card.checklists} card={card} updateCard={this.updateCard} /></div>}</div>
                                    <div>{isActivitiesShowing && <div> <h4 className="activity-sign">Activity </h4> <CardActivitiesShow activities={selectedBoard.activities} card={card} updateCard={this.updateCard} /></div>}</div>
                                </main>
                                <CardEditNav card={card} toggleLabelPalette={this.toggleLabelPalette} toggleChecklistBar={this.toggleChecklistBar} toggleCoverBar={this.toggleCoverBar}
                                    toggleAddDeutime={this.toggleAddDeutime} toggleAddImg={this.toggleAddImg} toggleAddMembers={this.toggleAddMembers} toggleDeleteCard={this.toggleDeleteCard} />
                            </div>


                            {this.state.isLabelPaletteShowing && <LabelPalette card={card} updateCard={this.updateCard} toggleLabelPalette={this.toggleLabelPalette} board={selectedBoard} updateBoard={this.props.updateBoard} />}
                            {this.state.isAddChecklistShowing && <AddChecklistBar card={card} updateCard={this.updateCard} toggleChecklistBar={this.toggleChecklistBar} />}
                            {this.state.isCoverShowing && <AddCoverBar card={card} updateCard={this.updateCard} toggleCoverBar={this.toggleCoverBar} />}
                            {this.state.isAddDeutimeShowing && <AddDeutimeBar card={card} updateCard={this.updateCard} toggleAddDeutime={this.toggleAddDeutime} addDeuDate={this.addDeuDate} />}
                            {this.state.isAddMembersShowing && <AddMembersBar card={card} updateCard={this.updateCard} toggleAddMembers={this.toggleAddMembers} users={users} />}
                            {this.state.isAddImgShowing && <AddImgBar card={card} updateCard={this.updateCard} toggleAddImg={this.toggleAddImg} addImg={this.addImg} />}
                            {this.state.isDeleteCardShowing && <DeleteCardBar cardId={card.id} boardId={selectedBoard._id} toggleDeleteCard={this.toggleDeleteCard} onRemoveCard={onRemoveCard} />}
                        </section>
                    </div>
                </div>
            </React.Fragment>
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
