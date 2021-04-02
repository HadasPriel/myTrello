import { Link } from 'react-router-dom'


export function BoardPreview(props) {
    const { board } = props
    const style = { boardStyle: { ...board.style } }

    return (
        <Link to={`/board/${board._id}`}>
            <li className="board-preview"
                style={{ backgroundImage: `url(${style.boardStyle.bgurl})` }}>
                <div className="content">
                    <p>{board.title}</p>
                </div>
            </li>
        </Link>
    )
}