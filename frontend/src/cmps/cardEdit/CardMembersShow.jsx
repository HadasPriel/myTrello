


export function CardMembersShow(props) {


    return (
        <div className="members">
            {props.isBig && <h5>Members </h5>}
            <ul className="card-member-show flex flex-end">

                {props.members.map(member => {
                    let userImgStyle = {
                        backgroundImage: `url(${member.imgUrl})`
                    }
                    return (
                        <li key={member._id} style={userImgStyle} className='user-img' >
                        </li>

                    )
                })}
            </ul>
        </div>
    )

}

