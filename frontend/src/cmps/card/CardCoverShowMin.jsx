import React, { Component } from 'react'
import { connect } from 'react-redux'

// import { socketService } from '../services/socketService'

class _CardCoverShowMin extends Component {
    state = {
    }



    render() {
        const { card } = this.props

        return (

            <div className={`cover min ${card.style.bgColor}`}>
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

export const CardCoverShowMin = connect(mapStateToProps, mapDispatchToProps)(_CardCoverShowMin)
