export function RemoveBoard(props) {
    return (
        <div className="remove-board-container">
            <p> I am  Remove Board CMP</p>
            <button onClick={() => { props.toggleDeleteBoard() }}>Back to Menu</button>
        </div>
    )
}