import { Link } from "react-router-dom"

export function AboutTasx() {

    const sections = [
        {
            img: 'homeNote',
            title: 'Hit your deadlines',
            txt: 'Collaborate, manage projects, and reach new productivity peaks. From high rises to the home office, the way your team works is unique - accomplish it all with TASX.',
            flexDiraction: ''
        },
        {
            img: 'homeTeam',
            title: 'Keep everyone looped in',
            txt: 'Start with a TASX board, lists, and cards. Customize and expand with more features as your teamwork grows. Manage projects, organize tasks, and build team spirit - all in one place.',
            flexDiraction: 'reverse'
        },
        {
            img: 'homeData1',
            title: 'Stay updated on project\'s progress',
            txt: 'Quick access to data about the progress of the tasks and team members in your projects, all shown in formatted graphs.',
            flexDiraction: ''
        }
    ]

    return (
        <section className="about-tasx main-container">
            <ul className="" >
                {sections.map(section =>
                    <li className={`about-unit flex space-between ${section.flexDiraction}`} key={section.img}>
                        <div className="txt">
                            <h3>{section.title}</h3>
                            <p className="">{section.txt}</p>
                        </div>
                        <img className={` ${section.flexDiraction}`} src={require(`../../assets/imgs/home/${section.img}.jpg`).default} alt="" />
                    </li>
                )}
                <li className={`cta about-unit flex justify-center align-center space-between`}>
                    <div >
                        <h3>What are you wating for?</h3>
                        <p>Build bords or use our templates to manage your projects</p>
                    </div>
                    <Link to="/board">
                        <button className="start-btn">start here</button>
                    </Link>
                </li>
            </ul>
        </section>
    )
}

