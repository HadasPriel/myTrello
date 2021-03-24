import { HorizontalBar } from 'react-chartjs-2';

export function BarBoard(props) {

    const groupCardMap = props.board.groups.reduce((cardsMapAcc, group) => {
        cardsMapAcc[group.title] = group.cards.length
        return cardsMapAcc
    }, {})


    const myData = {
        labels: Object.keys(groupCardMap),
        datasets: [{
            label: 'tasks',
            data: Object.values(groupCardMap),
            backgroundColor: ['#61BD4F', '#F2D600', '#FF9F1A', '#EB5A46', '#C377E0', '#0079BF'],
            hoverBackgroundColor: ['#61BD4F', '#F2D600', '#FF9F1A', '#EB5A46', '#C377E0', '#0079BF']

        }]
    }

    return (
        <section style={{ width: '40%' }}>
            <HorizontalBar data={myData}
                options={{
                    title: { display: true, text: 'Total Cards Per List', fontColor: '#ffff', fontSize: '14' },
                    legend: { display: false },
                    ticks: { precision: 0 },
                    scales: {
                        yAxes: [{
                            ticks: {
                                fontColor: '#ffff',

                                // beginAtZero: true,
                                // userCallback: function (label, index, labels) {
                                //     // when the floored value is the same as the value we have a whole number
                                //     if (Math.floor(label) === label) {
                                //         return label;
                                //     }

                                // }
                            }
                        }],
                        xAxes: [{
                            ticks: {
                                fontColor: '#ffff',
                                beginAtZero: true
                            }
                        }]
                    }
                }} />
        </section>
    )
}
