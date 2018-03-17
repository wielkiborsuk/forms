import { applyMiddleware, createStore, combineReducers } from 'redux';
import logger from 'redux-logger';
import { reducer as reduxFormReducer } from 'redux-form';
import {FORM_RESET, FORM_UPDATE_VALUE} from './actions';

const initialState = {
    contactForm: {}
};

const simpleReducer = (state = initialState, action) => {
    switch (action.type) {

        case FORM_UPDATE_VALUE:
            return {
                ...state,
                contactForm: {
                    ...state.contactForm,
                    [action.payload.name]: action.payload.value,
                }
            };

        case FORM_RESET:
            return initialState;

        default:
            return state;
    }
};

const reducer = combineReducers({
  form: reduxFormReducer,
  simple: simpleReducer
});

export const store = (window.devToolsExtension
  ? window.devToolsExtension()(createStore)
  : createStore)(reducer, applyMiddleware(logger));
