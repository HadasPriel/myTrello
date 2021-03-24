import React, { Component } from 'react'
import { connect } from 'react-redux'

// import { socketService } from '../services/socketService'

class _CardCoverShow extends Component {
    state = {
    }



    render() {
        const { card } = this.props
        return (

            <div className={`cover ${card.style.bgColor}`}>
                {/* <button className="edit-btn remove">Remove Cover </button> */}
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

export const CardCoverShow = connect(mapStateToProps, mapDispatchToProps)(_CardCoverShow)
