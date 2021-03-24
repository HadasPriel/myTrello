import { Bar } from 'react-chartjs-2';

export function BarLabels(props) {
    const labelsTitle = []
    const labelsTotal = []
    props.board.groups.forEach((group) => {
        group.cards?.forEach(card => {
            card.labels?.forEach(label => {
                if (labelsTotal[label.id]) labelsTotal[label.id]++
                else labelsTotal[label.id] = 1
                labelsTitle[label.id] = label.title
            })
        })
    })

    const myData = {
        labels: Object.values(labelsTitle),
        datasets: [{
            label: 'tasks',
            data: Object.values(labelsTotal),
            backgroundColor: Object.keys(labelsTitle),
            hoverBackgroundColor: Object.keys(labelsTitle)

        }]
    }

    return (
        <section style={{ width: '40%' }}>
            <Bar
                data={myData}
                options={{
                    title: { display: true, text: 'Labels Usage', fontColor: '#ffff', fontSize: '14' },
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
                }} />
        </section>
    )
}
