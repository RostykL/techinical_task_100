import React, {useReducer, useEffect, createContext} from 'react'
import axios from 'axios'

import './App.css';

import Employee from "./components/Employee";
import Birthday from "./components/Birthday";

function appReducer(state, action) {
    switch (action.type) {
        case 'loaded':
            return action.payload;
        case 'completed':
            return state.map(item => {
                if (item.id === action.payload) {
                    return {
                        ...item,
                        completed: !item.completed,
                    };
                }
                return item;
            });
        default:
            return state
    }
}

export const Context = createContext()

const App = () => {
    const localStorageName = 'employees';
    const [state, dispatch] = useReducer(appReducer, JSON.parse(window.localStorage.getItem(localStorageName)) ?? [])

    useEffect(() => {
        localStorage.setItem(localStorageName, JSON.stringify(state))
    }, [state])

    useEffect(() => {
        axios.get('https://yalantis-react-school-api.yalantis.com/api/task0/users')
            .then(res => {
                let addNewCompleteField = res.data.map(el => ({...el, completed: false}))
                if (JSON.parse(window.localStorage.getItem(localStorageName)) === null) {
                    window.localStorage.setItem(localStorageName, JSON.stringify(addNewCompleteField))
                }
                if (JSON.parse(window.localStorage.getItem(localStorageName)).length !== addNewCompleteField.length) {
                    window.localStorage.setItem(localStorageName, JSON.stringify(addNewCompleteField))
                }
                dispatch({type: 'loaded', payload: JSON.parse(window.localStorage.getItem(localStorageName))})
            })
    }, [])


    return (
        <Context.Provider value={[state, dispatch]}>
            <div className="container">
                <div className="wrapper">
                    <Employee/>
                    <Birthday/>
                </div>
            </div>
        </Context.Provider>
    );
};




export default App;
