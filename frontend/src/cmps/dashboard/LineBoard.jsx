import { Line } from 'react-chartjs-2';

export function LineBoard(props) {
    // console.log(props.board);
    // let membersActivities = {}
    // props.board.activities.forEach(activity => {
    //     if (membersActivities[activity.byMember.fullname]) membersActivities[activity.byMember.fullname]++
    //     else membersActivities = { ...membersActivities, [activity.byMember.fullname]: 1 }
    // })
    // console.log(membersActivities);

    const now = Date.now()
    const groupTimeMap = props.board.groups.reduce((timeMapAcc, group) => {
        let cardsInGroupSum = 0
        group.cards?.forEach(card => {
            cardsInGroupSum++
            // let diff = Math.round((now - card.createdAt) / (1000 * 60 * 60 * 24))
            let diff = (now - card.createdAt) / 36000 / 1000
            timeMapAcc[group.title] = Math.round(diff / cardsInGroupSum)

        })
        return timeMapAcc
    }, {})


    const myData = {
        labels: Object.keys(groupTimeMap),
        datasets: [{
            data: Object.values(groupTimeMap),
            backgroundColor: ['#0079BF'],
            hoverBackgroundColor: ['#0079BF'],

        }]
    }

    return (
        <section style={{ width: '40%' }}>
            <Line
                data={myData}
                options={{
                    title: { display: true, text: 'Average Lifetime Of Cards Per List In Days', fontColor: '#ffff', fontSize: '14' },
                    legend: { display: false },
                    ticks: { precision: 0 },
                    scales: {
                        yAxes: [{
                            ticks: {
                                fontColor: '#ffff',
                                beginAtZero: true,
                                userCallback: function (label, index, labels) {
                                    // when the floored value is the same as the value we have a whole number
                                    if (Math.floor(label) === label) {
                                        return label;
                                    }

                                }
                            }
                        }],
                        xAxes: [{
                            ticks: {
                                fontColor: '#ffff'

                            }
                        }]
                    }
                }}

            />
        </section>
    )
}



