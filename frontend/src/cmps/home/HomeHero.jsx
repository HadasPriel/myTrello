
export function HomeHero(props) {

    return (
        <section style={{ height: document.body.clientHeight - 32, paddingTop: document.body.clientHeight / 2.4 }} className="home-hero">
            <h1 className="app-name">TASX</h1>
            <h3>Manage your teamwork with the ease of your fingers</h3>
            {/* <button>Get started!</button> */}
            <button className="scroll-down" onClick={props.scrollToBottom}></button>

        </section>

    )
}