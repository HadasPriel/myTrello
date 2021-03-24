import React from 'react'

export function CardEditNav(props) {


    return (
        <nav className="card-edit-nav flex column">
            <h3>Add to card</h3>
            <button className="label-fa" onClick={props.toggleLabelPalette}> Labels</button>
            <button className="checklist-fa" onClick={props.toggleChecklistBar}> Checklist</button>
            <button className="cover-fa" onClick={props.toggleCoverBar}> Cover</button>
            <button className="duetime-fa" onClick={props.toggleAddDeutime}> Due Date</button>
            <button className="duetime-fa" onClick={props.toggleAddMembers}> Members</button>
            {/* <button onClick={props.toggleAddImg}> Image</button> */}
            <button className="delete-fa" onClick={props.toggleDeleteCard}> Delete</button>
            <button className="img-fa" onClick={props.toggleAddImg}> Image</button>
            {/* <button className="delete-fa"> Delete</button> */}

        </nav>
    )

}


