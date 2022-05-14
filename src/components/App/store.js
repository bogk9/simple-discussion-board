import { applyMiddleware } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import auth from '../../reducers/auth'
import logger from 'redux-logger'
import message from '../../reducers/message'
import prompt from '../../reducers/prompt';
import forceUpdate from '../../reducers/forceUpdate';

const middleware = [thunk];


const reducer = {
    auth: auth,
    message: message,
    prompt: prompt,
    forceUpdate: forceUpdate
}

export default configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
});