import React from 'react';

const initUserState: any = {
    login: false,
    usrName: "Alan Tai",
    usrEmail: "gogistics@gogistics-tw.com",
};
const UserStateContext = React.createContext(initUserState);
const reducer = (state: any, action: string) => {
    switch (action) {
        case "login":
            const newState = {...state};
            newState.login = true;
            return newState
        default:
            return state;
    }
}


export {UserStateContext, initUserState, reducer};