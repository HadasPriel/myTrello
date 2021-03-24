import React from 'react'


export function CardLabelShowMin(props) {

    return (
        <ul className="card-label-show">
            {props.labels.map(label => {
                return (
                    <li
                        key={label.id} className={`label ${label.id}`} >
                    </li>
                )
            })}
        </ul>
    )

}
