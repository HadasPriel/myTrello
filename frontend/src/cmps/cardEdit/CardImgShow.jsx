import React from 'react'


// import { socketService } from '../services/socketService'

export function CardImgShow(props) {


    const { card } = props
    const img = card.img


    return (
        <span className="card-ow">
            <img className="show" src={img} alt="" />
            {/* <p className={`duetime-fa ${urgent} `}>{` ${month} ${day}`}</p> */}
        </span>
    )
}
