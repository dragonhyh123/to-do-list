import {Action, createStore, Reducer, Store, StoreEnhancer, applyMiddleware} from 'redux';
import reducer from '../reducers';

export function configureStore(initialState?:StoreEnhancer) {
    const store = createStore(reducer, initialState);

    if ((module as any).hot) {
        // Enable Webpack hot module replacement for reducers
        (module as any).hot.accept('../reducers', () => {
            const nextReducer = require('../reducers');
            store.replaceReducer(nextReducer);
        });
    }
    return store;
}