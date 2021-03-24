import React, { Component } from 'react'
import { connect } from 'react-redux'

// import { socketService } from '../services/socketService'

class _CardMembersShow extends Component {

    // removeLable = (labelId) => {
    //     const cardToSave = { ...this.props.card }
    //     const labelsToSave = cardToSave.labels.filter(label => label.id !== labelId)
    //     cardToSave.labels = labelsToSave
    //     this.props.updateCard(cardToSave)
    // }

    render() {



        return (
            <ul className="card-member-show flex flex-end">

                {this.props.members.map(member => {
                    let userImgStyle = {
                        backgroundImage: `url(${member.imgUrl})`
                    }
                    return (
                        <li key={member._id} style={userImgStyle} className='user-img' >
                        </li>

                    )
                })}
            </ul>
        )
    }

}

const mapStateToProps = state => {
    return {
    }
}
const mapDispatchToProps = {
}

export const CardMembersShow = connect(mapStateToProps, mapDispatchToProps)(_CardMembersShow)
