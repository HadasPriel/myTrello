import { ActivityTime } from "../cardEdit/ActivityTime";


export function ActivityPreview(props) {

    return (
        <li className="activity-preview flex align-center">
            <div className="user-img inline-block" style={{ backgroundImage: `url(${props.activity.byMember.imgUrl})` }}></div>
            <div className="txt">
                <p> <span className="user-name">{props.activity.byMember.fullname}</span> {props.activity.txt}  </p>
                <ActivityTime time={props.activity.createdAt} />
            </div>
        </li>

    )
}