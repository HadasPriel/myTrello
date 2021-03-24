import { ActivityPreview } from './ActivityPreview'


export function ActivityBoard(props) {

    return (
        <section className="activity-container">
            <p className="menu-item menu-activity">Activity Log</p>
            <ul className="activity-list">
                {props.activities.map(activity =>
                    <ActivityPreview key={activity.id} activity={activity} />
                )}
            </ul>
        </section>
    )
}