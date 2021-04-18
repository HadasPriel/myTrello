import { BoardPreview } from './BoardPreview.jsx'

export function BoardList({ boards, title, toggleNewBoard }) {
    const boardsForDisplay = boards
    // console.log(boardsForDisplay);
    // const boardsForDisplay = props.boards.slice(0, 6)

    return (
        <section className="board-list ">
            <h2 className="title">{title}</h2>
            <ul className="flex wrap">
                {boardsForDisplay.map(board =>
                    <BoardPreview board={board} key={board._id} className="board" />
                )}
                {(title !== 'Templates boards') && <li onClick={toggleNewBoard} className="board-preview add-board-btn"><p>+ Add board</p></li>}
            </ul>
        </section>
    )
}

