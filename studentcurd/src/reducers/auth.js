import { AUTH, LOGOUT } from "../actions/actionTypes";

const authReduce = (state = {authData: null}, action)=>{
    switch(action.type){
        case AUTH:
            localStorage.setItem('profile', JSON.stringify({ ...action?.data}));
            return {...state, autoData: action?.data};
        case LOGOUT:
            localStorage.clear();
            return {...state, autoData: null};
        default:
            return state;
    }
}

export default authReduce;