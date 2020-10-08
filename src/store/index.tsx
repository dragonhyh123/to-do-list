import {Action, createStore, Reducer, Store, StoreEnhancer, applyMiddleware,Middleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducer from '../reducers';

export function configureStore() {
    let middleware1:Middleware = store => next => action => {
            console.log('dispatching', action);
            let result = next(action);
            console.log('next state', store.getState());
            return result;
        };

    const enhancer = applyMiddleware(middleware1,thunkMiddleware);
    const store = createStore(reducer,enhancer);

    if ((module as any).hot) {
        // Enable Webpack hot module replacement for reducers
        (module as any).hot.accept('../reducers', () => {
            const nextReducer = require('../reducers');
            store.replaceReducer(nextReducer);
        });
    }
    return store;
}