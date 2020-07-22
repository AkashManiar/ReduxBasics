/* Step-4 Implement a redux store which holds the state of entire application,
Now you will see we already have state of application as initialState, so
we have to implement the redux store. Use redux in-built method to create store */

const redux = require('redux')
const reduxLogger = require('redux-logger')
// See where this function is been called
const createStore = redux.createStore
const applyMiddleware = redux.applyMiddleware
const combineReducers = redux.combineReducers
const logger = reduxLogger.createLogger()

// Step-1: First define a string constant that indicates the type of action 
const BUY_CAKE = 'BUY_CAKE'
const BUY_ICE_CREAM = 'BUY_ICE_CREAM' 

//  Step-2: Define action (Action are just common JS objects), 
//  it has type property along with possibly other parameters
/* {
        type: BUY_CAKE,
        info: 'First redux action'
    }*/

// Step-3 Create an action creator, it is just a function which returns the action

function buyCake() {
    return {
        type: BUY_CAKE,
        info: 'First redux action'
    }
}

function buyIceCream() {
    return {
        type: BUY_ICE_CREAM,
        info: 'Ice-cream action'
    }
}
/* Step-4 Describe a reducer. Reducer is the one which takes the previous state 
of the application, along with action and returns the new state */

// (previousState, action) => newState

// When application gets started initial state is been passed to the reducers
// const initialState = {
//     numOfCakes : 10
// } 


const initialCakeState = {
    numOfCakes : 10
}

const initialIceCreamState = {
    numOfIceCreams : 20
}
/* Remember with returning new state we are not mutating existing state, 
we return entirely new state of the application, hence we want to clone the
state first (using "...") and change properties which we need to and return new state */

// const reducer = (state = initialState, action) => {
//     switch(action.type) {
//         case BUY_CAKE: 
//             return {
//                 ...state,
//                 numOfCakes: state.numOfCakes - 1
//             }
//         default: return state
//     }
// }

const CakeReducer = (state = initialCakeState, action) => {
    switch(action.type) {
        case BUY_CAKE: 
            return {
                ...state,
                numOfCakes: state.numOfCakes - 1
            }
        default: return state
    }
}
const IceCreamReducer = (state = initialIceCreamState, action) => {
    switch(action.type) {
        case BUY_ICE_CREAM: 
            return {
                ...state,
                numOfIceCreams: state.numOfIceCreams - 1
            }
        default: return state
    }
}

const rootReducer = combineReducers({
    cake: CakeReducer,
    iceCream: IceCreamReducer
})

// So here is the responsibility-1 of redux to have a store holding the entire application state
const store = createStore(rootReducer, applyMiddleware(logger))

// Step-5 responsibility-2, Allow to get State of application using getState()
console.log('Initial state', store.getState())

/* Step-6 responsibility-4, Allow the app to subscribe to changes to the store, which is achieved
through subscribe method. Subscribe method also returns the call back which can be called
to unsubscribe changes to store. */
const unsubscribe = store.subscribe(() => {});

/* Step-7 responsibility-3, Use store's dispatch method to update the state */
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyIceCream())
store.dispatch(buyIceCream())
unsubscribe()





