

import React from 'react'

export function ChecklistSign(props) {
    let done = 0
    let all = 0

    props.checklists.forEach(Checklist => {
        Checklist.todos.forEach(todo => {
            if (todo.isDone === true) done++
            all++
        })
    })

    return (
        <span className="checklistSign sign" > {`${done} / ${all}`} </span>
    )

}


