import { Pie } from 'react-chartjs-2';

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
            backgroundColor: ['#61BD4F', '#F2D600', '#FF9F1A', '#EB5A46', '#C377E0', '#0079BF'],
            hoverBackgroundColor: ['#61BD4F', '#F2D600', '#FF9F1A', '#EB5A46', '#C377E0', '#0079BF'],
            fontColor: '#ffff'
        }]
    }

    return (
        <section style={{ width: '40%' }}>
            <Pie data={data} options={{
                title: { display: true, text: 'Total Cards Per Member', fontColor: '#ffff', fontSize: '14' },
                legend: { display: false },
                ticks: { precision: 0 },
                scales: {
                    yAxes: [{
                        ticks: {
                            fontColor: '#ffff',
                            beginAtZero: true,
                            userCallback: function (label, index, labels) {
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
