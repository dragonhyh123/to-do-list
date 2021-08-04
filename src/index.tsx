import * as ReactDOM from 'react-dom';
import {App} from './app/App';
import * as React from 'react';
import {configureStore} from "./store";
import {Provider} from "react-redux";

const store = configureStore();

// @ts-ignore
ReactDOM.render(<Provider store={store}>
                    <App />
                </Provider>,
                document.getElementById('root'));