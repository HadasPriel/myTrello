import React from 'react'


export function CardImgShow(props) {
    const img = props.card.img

    return (
        <div className="card-img">
            <span className="card-ow">
                <img className="show" src={img} alt="" />

            </span>
        </div>
    )
}
