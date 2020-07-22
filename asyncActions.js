/* Here we would create complete redux setup, for async actions
    Let's say you have to fetch the users, so for that you would request 
    users, based on response either it gets successful or gets failed.
    So these defines what our actions would be. Based on scenario above,
    we can have 3 actions for each and one that uses these three.
*/

// Import redux and createStore
const redux = require('redux')
const axios = require('axios')

// We are using redux-thunk, which allows us to return function instead of the plane object
const thunkMiddleware = require('redux-thunk').default

const applyMiddleware = redux.applyMiddleware
const createStore = redux.createStore

// Declaring constants
const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST'
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS'
const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE'

// Declaring initial state
const initialUsersState = {
    loading: false,
    users: [],
    error: ''
}

// Writing our action creators (Functions that returns action along with its TYPE, by which reducer would know how to update the state)
const fetchUserRequest = () => {
    return {
        type: FETCH_USERS_REQUEST,
    }
}

const fetchUserSuccess = user => {
    return {
        type: FETCH_USERS_SUCCESS,
        payload: user
    }
}
const fetchUserFailure = error => {
    return {
        type: FETCH_USERS_FAILURE,
        payload: error
    }
}


// Defining our reducer to handle our actions
const reducer = (state = initialUsersState, action) => {
    switch(action.type) {
        case FETCH_USERS_REQUEST: 
            return {
                ...state,
                loading: true,
            }
        case FETCH_USERS_SUCCESS: 
            return {
                ...state,
                loading: false,
                users: action.payload,
                error: ''
            }
        case FETCH_USERS_FAILURE: 
            return {
                ...state,
                loading: false,
                users: [],
                error: action.payload
            }
        default:
            return state
    }
}

const fetchUsers = () => {
    return function(dispatch, getState) {
        /* redux-thunk gives two methods as its arguments, first is dispatch 
            which is used to dispatch any actions, another one is getState,
            to get current state of the application.
        */
        console.log('_Inside_fetchUsers_', getState());
        dispatch(fetchUserRequest())
        axios.get('https://jsoneeeplaceholder.typicode.com/users')
            .then(response => {
                const users = response.data.map(user => user.id)
                dispatch(fetchUserSuccess(users))
            })
            .catch(err => {
                dispatch(fetchUserFailure(err.message))
            })
    }
}

// Creating store
const store = createStore(reducer, applyMiddleware(thunkMiddleware))

store.subscribe(() => { console.log(store.getState()) })
store.dispatch(fetchUsers())