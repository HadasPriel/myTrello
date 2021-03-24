



export function PieBoard(props) {
    const membersTaskMap = props.board.groups.reduce((membersMapAcc, group) => {
        group.cards?.forEach(card => {
            card.members?.forEach(member => {
                const count = membersMapAcc[member.fullname] + 1 || 1
                membersMapAcc[member.fullname] = count
            })
        })
        return membersMapAcc
    }, {})

    const data = {
        labels: Object.keys(membersTaskMap),
        datasets: [{
            data: Object.values(membersTaskMap),
        }]
    }

    return (
        <section>
            <Pie data={data} />
        </section>
    )
}
