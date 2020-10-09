import {Action, createStore, Reducer, Store, StoreEnhancer, applyMiddleware,Middleware,PreloadedState} from 'redux';
import thunkMiddleware from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import {createLogger} from 'redux-logger';
import reducer from '../reducers';

interface initialState{login?:{userName:string,passWord:string}}

function * helloSaga() {
    console.log('Hello Sagas!');
}

export function configureStore(initialState?:PreloadedState<initialState>) {
    let middleware1:Middleware = store => next => action => {
            console.log('dispatching', action);
            let result = next(action);
            console.log('next state', store.getState());
            return result;
        };
    const sagaMiddleware=createSagaMiddleware();

    const enhancer = applyMiddleware(middleware1,thunkMiddleware,sagaMiddleware);
    const store = createStore(reducer,initialState,enhancer);
    sagaMiddleware.run(helloSaga);

    if ((module as any).hot) {
        // Enable Webpack hot module replacement for reducers
        (module as any).hot.accept('../reducers', () => {
            const nextReducer = require('../reducers');
            store.replaceReducer(nextReducer);
        });
    }
    return store;
}