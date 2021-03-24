import { BoardPreview } from './BoardPreview.jsx'

export function BoardList(props) {
    const boardsForDisplay = props.boards.slice(0, 6)

    return (
        <ul className="board-list inline-block">
            { boardsForDisplay.map(board =>
                <BoardPreview board={board} key={board._id} className="board" />
            )}
            {/* <li onClick={props.toggleNewBoard} className="add-board-btn">Add board</li> */}
        </ul>
    )
}

