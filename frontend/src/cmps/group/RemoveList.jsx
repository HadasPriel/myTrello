

export function RemoveList(props) {

    return (
        <section className="edit-bar">
                <header className="seconde">
                    <h3> Delete list?</h3>
                    <button onClick={props.toggleDeleteBar}>x</button>

                </header>
                <main>
                    <p>All actions will be removed from the activity feed and you won’t be able to re-open the list. There is no undo.</p>
                    <button className="add-btn red" onClick={()=>props.onRemoveGroup(props.group.id, props.group.title)}>Delete</button>
                </main>
            </section>
    )
}