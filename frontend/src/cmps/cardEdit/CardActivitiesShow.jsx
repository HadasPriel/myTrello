import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ActivityTime } from './ActivityTime'

class _CardActivitiesShow extends Component {

    render() {
        this.props.activities.filter(activity => {
            if (activity.card.id === this.props.card.id) return <div></div>
        })
        return (
            <ul className="card-activities-show card-show show">
                {this.props.activities.map(activity => {
                    if (activity.card.id === this.props.card.id) return (
                        <li key={activity.id} className="flex align-center" >
                            <div className="user-img inline-block" style={{ backgroundImage: `url(${activity.byMember.imgUrl})` }}></div>
                            <div className="txt">
                                <p><span>{activity.byMember.fullname} </span> {` ${activity.txt} to this card`}</p>
                                <ActivityTime time={activity.createdAt} />
                            </div>
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

export const CardActivitiesShow = connect(mapStateToProps, mapDispatchToProps)(_CardActivitiesShow)
