import { AUTH } from './actionTypes';
import * as api from '../apis/index';

export const issignin = (formdata,navigate) => async (dispatch)=>{
    try{
        const {data} = await api.signin(formdata);

        dispatch({type: AUTH, data});

        navigate('/');
    }catch(err){
        console.log(err)
    }
}

export const issignup = (formdata,navigate) => async (dispatch)=>{
    try{
        const {data} = await api.signup(formdata);

        dispatch({type: AUTH, data});

        navigate('/');
    }catch(err){
        console.log(err)
    }
}