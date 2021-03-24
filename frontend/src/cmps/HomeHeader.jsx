import { Link } from 'react-router-dom'




export function HomeHeader(props) {


    return (
        <header className="app-header flex space-between align-center">
            <nav>
                <Link to="/" className="header-home"></Link>
                <Link to="/board" className="header-board"> Boards </Link>
            </nav>

            <nav className="navbar-links">
                {!props.loggedInUser && <Link to="/login" className="header-user"> Login</Link>}
                {props.loggedInUser && <Link to="/login" className="user-img" style={{ backgroundImage: `url(${props.loggedInUser.imgUrl})` }}> </Link>}

            </nav>
        </header>

    )
}

