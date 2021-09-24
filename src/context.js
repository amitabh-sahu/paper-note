import React, { createContext, useContext, useReducer } from 'react';

const initialState = { user: null };

const reducer = (state, action) => {
    // console.log(action);
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                user: action.user,
            };
        default:
            return state;
    }
};

const StateContext = createContext();

export const StateProvider = ({ children }) => (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </StateContext.Provider>
);

export const useStateValue = () => useContext(StateContext);