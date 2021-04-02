

export function ActivityTime({ time }) {
    let timeToPresent
    const a = new Date(time)
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    if (min < 10) min = '0' + min
    if (hour < 10) hour = '0' + hour
    var dateToPresent = month + ' ' + date
    var hourToPresent = ' at ' + hour + ':' + min


    switch (Date.now() - time) {
        case Date.now() - time < 1000 * 60:
            timeToPresent = "Just now";
            break;
        case Date.now() - time < 1000 * 60 * 2:
            timeToPresent = "a minute ago" + hourToPresent
            break;
        case Date.now() - time < 1000 * 60 * 3:
            timeToPresent = "two minute ago" + hourToPresent
            break;
        case Date.now() - time < 1000 * 60 * 4:
            timeToPresent = "three minute ago" + hourToPresent
            break;
        case Date.now() - time < 1000 * 60 * 5:
            timeToPresent = "four minute ago" + hourToPresent
            break;
        case Date.now() - time < 1000 * 60 * 6:
            timeToPresent = "about five minute ago" + hourToPresent
            break;
        case Date.now() - time < 1000 * 60 * 31:
            timeToPresent = "half an hour ago" + hourToPresent
            break;
        case Date.now() - time < 1000 * 60 * 61:
            timeToPresent = "an hour ago" + hourToPresent
            break;
        case Date.now() - time < 1000 * 60 * 60 * 24:
            timeToPresent = "an few houers ago" + hourToPresent
            break;
        case Date.now() - time < 1000 * 60 * 60 * 60 * 48:
            timeToPresent = "an day ago" + hourToPresent
            break;

        default:
            timeToPresent = dateToPresent + hourToPresent

    }

    return (
        <small className="activity-time">{timeToPresent}</small>
    )

}

