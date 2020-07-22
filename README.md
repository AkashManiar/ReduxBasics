# ReduxBasics
This code contains sample node application which implements redux, as explained in https://www.youtube.com/playlist?list=PLC3y8-rFHvwheJHvseC3I0HuYI2f46oAK. Check out comments and see what are concepts of redux.

## Principles of redux
-----------------------
1) The state of your whole application is stored in an object tree within a single store
2) The only way to change the state is to emit an action, an object describing what happened. So if you want ot update the state of the application you need to let redux know about an action, You are not allowed to directly update the state of the application, described by type:...
3) To specify how the state tree is transformed by actions, you write pure reducers.
Reducer - (previousState, action) => newState


## Redux store
-----------------
Redux store has following responsibilities:
- Holds application state
- Allows access to state via getState()
- Allows state to be updated via dispatch(action) 
- Registers listeners via subscribe(listener)
- Handles un-registering of listeners via function returned by subscribe(listener) as a callback.

## Other important things
---------------------
- Store is created using "createStore", which takes the reducer function (only one reducer), along with "applyMiddleware" parameter function which takes middleware to be used
- Create action creators, instead of directly dispatching actions into the dispatch function. This allows us to easily update action and it parameters at one place, i.e. within action creators
- To combine reducers use combineReducers function ships with redux. Only one reducer function handling multiple functionality makes code harder to maintain, so we create multiple reducers and combine all of them using "combineReducers"
- It is a suggested way to extend the redux with custom functionality
- It provides the third-party extension between dispatching an action, and moment it reaches the reducer
- we may use middleware to logging, crash reporting, performing async tasks etc.
- Axios is used to make async requests
- Redux Thunk middleware allows you to write action creators that return a function instead of an action. 	The thunk can be used to delay the dispatch of an action, or to dispatch only if a certain condition is met. The inner function receives the store methods "dispatch" and "getState" as parameters.