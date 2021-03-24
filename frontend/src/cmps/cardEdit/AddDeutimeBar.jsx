import React, { useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import { connect } from 'react-redux'

// import { socketService } from '../services/socketService'

export function AddDeutimeBar(props) {




    const [startDate, setStartDate] = useState(new Date());


    return (
        <div className="edit-bar">
            <header className="seconde">
                <h3>Due Date</h3>
                <button onClick={props.toggleAddDeutime}>x</button>

            </header>
            <main>
                <DatePicker
                    selected={startDate}
                    onSelect={date => setStartDate(() => { props.addDeuDate(date) })}
                    inline
                />
            </main>
        </div>
    );

}

