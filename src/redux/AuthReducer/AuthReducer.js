import axios from 'axios';

const initialState = {
    username: '',
    password: '',
    img: '',
    user: {},
    loading: false
}

const UPDATE_STATE = 'UPDATE_STATE';
const REGISTER_USER = 'REGISTER_USER';
const LOGIN_USER = 'LOGIN_USER';

export const updateState = e => {
    return {
        type: UPDATE_STATE,
        payload: e
    }
}

export const registerUser = (username, password) => {
    return {
        type: REGISTER_USER,
        payload: axios.post('/auth/register', {
            username,
            password,
            img: `https://robohash.org/${username}`
        })
    }
}

export const loginUser = (username, password) => {
    return {
        type: LOGIN_USER,
        payload: axios.post('/auth/login', {
            username,
            password
        })
    }
}


export default function authReducer(state = initialState, action) {
    const { payload, type } = action;

    switch(type) {
        case UPDATE_STATE:
            return {...state, ...payload}
        case `${REGISTER_USER}_PENDING`:
            return {...state, loading: true}
        case `${REGISTER_USER}_FULFILLED`:
            return {...state, loading: false, payload: payload.data}
        case `${LOGIN_USER}_PENDING`:
            return {...state, loading: true}
        case `${LOGIN_USER}_FULFILLED`:
            return {...state, loading: false, user: payload.data, img: payload.data.img}

        default:
            return state;
    }
}