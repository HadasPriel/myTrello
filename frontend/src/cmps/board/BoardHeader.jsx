// import { Link, NavLink } from 'react-router-dom'



export function BoardHeader(props) {

    const { board } = props
    return (


        <header className="app-header board-header flex space-between align-center">
            <nav>
                <h5>{board.title}</h5>
            </nav>

            <nav className="navbar-links">
                <button className="header-invite"> Invite</button>
                <button className="header-show-menu" onClick={props.toggleSideMenu}> Show Menu</button>

            </nav>
            {/* <button className="user-avatar">HS</button> */}

        </header>

    )
}

