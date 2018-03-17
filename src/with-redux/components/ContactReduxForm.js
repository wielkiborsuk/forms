import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { required, phone, email } from '../validators';

const renderField = ({input, label, type, placeholder, meta: {touched, error}}) => (
  <div className="form-control">
    <label>{label}</label>
    <input type={type} placeholder={placeholder} {...input} />
    {touched && error &&
    <span className="error">{error}</span>}
  </div>
)

const renderTextarea = ({input, label, type, placeholder, meta: {touched, error}}) => (
  <div className="form-control">
    <label>{label}</label>
    <textarea placeholder={placeholder} {...input} />
    {touched && error &&
    <span className="error">{error}</span>}
  </div>
)

const isFormValid = (form) => {
  return form && (!form.anyTouched || !form.syncErrors || (form.syncErrors && !Object.keys(form.syncErrors).length));
}

let ContactReduxForm = (props) => {
  const {myFieldValues: {canContact}, formState, handleSubmit} = props
  return (
    <form onSubmit={handleSubmit}>
      <Field
        component={renderField}
        name="name"
        type="text"
        label="Your Name"
        placeholder="Type your name here"
        validate={required}
      />
      <Field
        component={renderField}
        name="email"
        type="email"
        label="E-mail"
        placeholder="Type your email here"
        validate={[required, email]}
      />
      <Field
        component={renderTextarea}
        name="question"
        label="Question"
        placeholder="Type your question here"
        validate={required}
      />
      <Field
        component={renderField}
        name="canContactByPhone"
        type="checkbox"
        label="Can contact you by phone?"
      />
      {canContact &&
      <Field
        component={renderField}
        name="phone"
        type="text"
        label="Phone number"
        placeholder="Type your phone here"
        validate={[required, phone]}
      />
      }
      <button disabled={!isFormValid(formState)} type="submit">Submit</button>
    </form>
  );
}

ContactReduxForm = reduxForm({
  form: 'contactForm'
})(ContactReduxForm);

const selector = formValueSelector('contactForm')
ContactReduxForm = connect(state => ({
  myFieldValues: {
    canContact: selector(state, 'canContactByPhone')
  },
  formState: state.form.contactForm
}))(ContactReduxForm);

export { ContactReduxForm };
