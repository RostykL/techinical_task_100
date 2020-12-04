import React, {useContext, useEffect, useState} from "react";

import {Context} from "../App"

import BirthdayItem from "./BirthdayItem";

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export default function Birthday() {
    const [state, dispatch] = useContext(Context)
    const [checked, setChecked] = useState([])
    const [checkedMonth, setCheckedMonth] = useState(new Set())

    useEffect(() => {
        let checked = []
        let checkedMonth = new Set()
        for (let i = 0; i < state.length; i++) {
            if (state[i]['completed']) {
                checked.push(state[i])
                checkedMonth.add(months[Number(state[i]['dob'].substr(6, 1))])
            }
        }
        setChecked(checked)
        setCheckedMonth(checkedMonth)

    }, [state])


    return (
        <div className="birthday">
            <div className="birthday_title align">Employees birthday</div>
            <div className="birthday_block">
                {[...checkedMonth].map(el => {
                    return (
                        <div key={el} className="birthday_block_item">
                            <div className="month_name">{el}</div>
                            {availableMonths(checkedMonth, checked)[el].map(person => {
                                let date = person['dob'].substr(0, 10).split('-')
                                let day = date[2];
                                let date_month = months[Number(date[1])];
                                let year = date[0];
                                let info = {
                                    day, date_month, year, date
                                }
                                return <BirthdayItem {...info} firstName={person['firstName']}
                                                     lastName={person['lastName']}
                                                     key={person['id']}/>
                            })}
                        </div>)
                })}
            </div>
        </div>)

}

const availableMonths = (checkedMonth, checked) => {
    let available_month = []

    for (let month of checkedMonth) {
        available_month[month] = []
    }

    for (let i = 0; i < checked.length; i++) {
        for (let month of checkedMonth) {
            if (months[Number(checked[i]['dob'].substr(6, 1))] === month) {
                available_month[month].push(checked[i])
            }
        }
    }
    return available_month

}
