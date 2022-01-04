import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ActivityTime } from './ActivityTime'

class _CardActivitiesShow extends Component {

    render() {

        return (
            <section>
                <h4 className="activity-sign">Activity</h4>
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
                        else return ''
                    })}
                </ul>
            </section>
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
