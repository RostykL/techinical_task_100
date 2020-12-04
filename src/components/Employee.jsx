import React, {useContext, useState, useEffect} from "react";

import EmployeeItem from "./EmployeeItem";
import {Context} from "../App"

const ALPHABET = "abcdefghijklmnopqrstuvwxyz".split("");

export default function Employee() {
    const [state, dispatch] = useContext(Context)

    useEffect(() => {
        dispatch({type: 'loaded', payload: state})
    }, [])

    const unused_letters = () => {
        let unique = []
        for (let i = 0; i < ALPHABET.length; i++) {
            let found = true;
            for (let j = 0; j < state.length; j++) {
                if (state[j]['lastName'][0].toLowerCase() === ALPHABET[i]) {
                    found = false;
                    break;
                }
            }
            if (found) {
                unique.push(ALPHABET[i])
            }
        }
        return unique;
    }


    return <div className="employees">
        <div className="employees_title align">Employees</div>
        <div className="employees_info_block">
            {ALPHABET.map((letter, i) => (
                <div className="employees_block" key={letter}>
                    <div className="employee_letter" key={i}>{letter}</div>
                    {showNames(state, letter, unused_letters())}
                </div>
            ))}
        </div>
    </div>
}

const showNames = (state, letter, initial) => {
    if (!initial.includes(letter)) {
        return state.map(el => {
            if (el['lastName'] !== undefined && el['lastName'][0].toLowerCase() === letter) {
                return <EmployeeItem firstName={el.firstName} lastName={el.lastName}
                                     id={el.id}
                                     key={el.id}
                                     completed={el.completed}/>
            }
        })
    } else {
        return <div>-</div>
    }
}
