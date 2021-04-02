

export function AboutMe() {

    const us = [
        {
            name: 'Hadas Priel',
            img: 'https://res.cloudinary.com/ddgevj2yp/image/upload/v1610985212/T01C3G80Y9K-U01DZHFHVDW-dbfd8d80a8ed-512_zadnxc.jpg',
            txt: ['Full Stack Web Developer', 'B.A. Psychology and Education, Ben Gurion University', 'Management experience'],
            email: 'hadass91@gmail.com',
            facebook: 'https://www.facebook.com/hadas.eliav',
            linkedin: 'https://www.linkedin.com/in/hadas-eliav-priel-aa6705a2'
        },
        {
            name: 'Sandra Zufman',
            img: 'https://res.cloudinary.com/ddgevj2yp/image/upload/v1610985272/T01C3G80Y9K-U01C55ZS84D-198fe46a1d2e-512_foiwqp.jpg',
            txt: ['Full Stack Web Developer.', 'B.A. Administration and Management, Accounting,', 'The College of Management and Academic Studies', 'Communicative and a team player'],
            email: 's.zufman@outlook.com',
            facebook: 'https://www.facebook.com/zufman',
            linkedin: 'https://www.linkedin.com/in/sandra-zufman-3784462b'
        }
    ]


    return (


        <section className="about-me">
            <div className="main-container">
                <header>
                    <h2>Meet the team</h2>
                    <p>We are MisterBit© Coding Academy alumni that came together and assembled TASX as our Full-Stack Developer course's final hand-in.</p>
                </header>
                <ul className="cv-list flex justify-center" >
                    {us.map(star =>
                        <li className="cv flex col align-center" key={star.name}>
                            <img className="user-img" src={star.img} alt={star.img} />
                            <div className="txt">
                                <h3>{star.name}</h3>
                                {/* <a className="mail-address" href={`mailto:${star.email}`} >{star.email}</a> */}
                                {star.txt.map(skil =>
                                    <p className="skil" key={skil}>{skil} </p>
                                )}
                                {/* <p>Full Stack Web Developer, passionate about solving challenges, with experience in writing single-page-applications using the latest WEB technologies such as Node.js, Vue.js, Vue, React, Redux, Angular and MongoDb.</p> */}
                                <nav className="social-media">
                                    <a href={star.linkedin} className="linkedin" ></a>
                                    <a href={star.facebook} className="facebook"></a>
                                    <a href={`mailto:${star.email}`} className="email"></a>
                                </nav>
                            </div>
                        </li>
                    )}
                </ul>
            </div>
        </section>
    )
}
