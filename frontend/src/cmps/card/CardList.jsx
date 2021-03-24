import { CardPreview } from './CardPreview.jsx'
import { Droppable } from 'react-beautiful-dnd'


export function CardList(props) {
    return (
        <Droppable droppableId={props.groupId} type="card" >
            {(provided) => (
                <ul className="card-list" {...provided.droppableProps} ref={provided.innerRef}>
                    {props.cards.map((card, index) =>
                        <CardPreview key={card.id} card={card} groupId={props.groupId} index={index} />
                    )}
                    {provided.placeholder}
                </ul>
            )}

        </Droppable>
    )
}