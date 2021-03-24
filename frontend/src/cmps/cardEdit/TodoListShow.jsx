import React from 'react'
import { TodoShow } from './TodoShow'

export function TodoListShow(props) {


    const { checklist, card, updateCard, removeTodo } = props
    return (
        <ul className="show">
            {checklist.todos.map(todo => <TodoShow key={todo.id} todo={todo}
                card={card} checklistId={checklist.id}
                updateCard={updateCard} removeTodo={removeTodo} />)}
        </ul>
    )

}






