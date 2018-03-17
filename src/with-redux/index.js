import React from 'react';
import {Provider} from 'react-redux';
//import {ContactForm} from './components/ContactForm';
import { ContactReduxForm } from './components/ContactReduxForm';
import {store} from './store';


const submit = (values) => {
  alert(JSON.stringify(values));
}

const WithRedux = () => (
    <Provider store={store}>
      <div>
        <ContactReduxForm onSubmit={submit} />
        { /* <ContactForm/> */ }
      </div>
    </Provider>
);

export {WithRedux};
