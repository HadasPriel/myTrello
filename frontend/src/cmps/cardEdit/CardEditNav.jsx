import React from 'react'

export function CardEditNav(props) {

    const toggleNav = (ev) => {
        props.toggleShowingNav(ev.target.name)
    }


    return (
        <nav className="card-edit-nav flex column">
            <h3>Add to card</h3>
            <button className="label-fa" name="labelPalette" onClick={toggleNav}> Labels</button>
            <button className="checklist-fa" name="checklist" onClick={toggleNav}> Checklist</button>
            <button className="cover-fa" name="cover" onClick={toggleNav}> Cover</button>
            <button className="duetime-fa" name="dueTime" onClick={toggleNav}> Due Date</button>
            <button className="duetime-fa" name="members" onClick={toggleNav}> Members</button>
            <button className="delete-fa" name="delete" onClick={toggleNav}> Delete</button>
            <button className="img-fa" name="img" onClick={toggleNav}> Image</button>
        </nav>
    )

}


