import React, { Component } from 'react'
import { connect } from 'react-redux'

// import { socketService } from '../services/socketService'

class _AddMembersBar extends Component {
    state = {
        member: { fullname: '' }
    }



    handleChange = (ev) => {
        const member = { ...this.state.member }
        member[ev.target.name] = ev.target.value

        this.setState({ member })
    }

    onAddMembers = (user) => {
        const { card } = this.props
        const cardToSave = { ...card }
        const userToRemove = card.members.find(currUser => currUser._id === user._id)
        if (userToRemove) {
            const newMembers = card.members.filter(currUser => currUser._id !== user._id)
            cardToSave.members = newMembers
            this.setState({ member: { fullname: '' } })

        } else {
            const miniUser = { _id: user._id, fullname: user.fullname, imgUrl: user.imgUrl }
            cardToSave.members = (cardToSave.members) ? [...cardToSave.members, miniUser] : [miniUser]
        }
        this.props.updateCard(cardToSave, `added ${this.state.member.fullname}`)
        this.setState({ member: { fullname: '' } })
    }

    render() {
        const { toggleAddMembers, users, card } = this.props

        return (

            <div className="add-members-bar edit-bar">
                <header className="seconde">
                    <h3>Add Members</h3>
                    <button onClick={toggleAddMembers}>x</button>

                </header>
                <main>
                    <label>Members
                    <input list="members" name="fullname" value={this.state.member.fullname}
                            onChange={this.handleChange} autoFocus autoComplete="off" ></input>
                    </label>
                    <ul>
                        {users.map(user => {
                            const alreadyMember = (card.members?.find(currUser => currUser.fullname === user.fullname)) ? 'alreadyMember' : ''
                            return (
                                <li className={alreadyMember} key={user._id} value={user.fullname} onClick={() => { this.onAddMembers(user) }}>
                                    <div className="member-item">
                                        <div className="user-img" style={{ backgroundImage: `url(${user.imgUrl})` }}></div>
                                        {user.fullname}
                                    </div>
                                </li>)
                        })}
                    </ul>
                    {/* <datalist id="members">
                        {users.map(user => {
                            const alreadyMember = (card.members?.find(currUser => currUser.fullname === user.fullname)) ? 'alreadyMember' : ''
                            return <option className={alreadyMember} key={user._id} value={user.fullname}> </option>
                        })}
                    </datalist> */}
                    {/* <button className="add-btn">Add</button> */}
                </main>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
    }
}
const mapDispatchToProps = {

}

export const AddMembersBar = connect(mapStateToProps, mapDispatchToProps)(_AddMembersBar)
