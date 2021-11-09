import React from 'react'


export function CardImgShow(props) {
    const img = props.card.img

    return (
        <span className="card-ow">
            <img className="show" src={img} alt="" />
        </span>
    )
}
