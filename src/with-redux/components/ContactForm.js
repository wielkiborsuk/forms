import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Input } from "./Input";
import { update, reset } from "../actions";

class ContactFormBase extends Component {
  state = {
    validations: []
  };

  registerValidation = isValidFunc => {
    this.setState(s => ({ validations: s.validations.concat([isValidFunc]) }));
    return () => this.removeValidation(isValidFunc);
  };

  removeValidation = ref => {
    this.setState(s => ({ validations: s.validations.filter(f => f === ref) }));
  };

  isFormValid = showErrors => {
    return this.state.validations.reduce((p, c) => c(showErrors) && p, true);
  };

  submit = event => {
    event.preventDefault();

    if (this.isFormValid(true)) {
      // this.props.onSubmit(assign({}, this.props.values));
      this.props.reset();
    }
  };

  render() {
    return (
      <form>
        <Input
          registerValidation={this.registerValidation}
          value={this.props.fields.name}
          name="name"
          onChange={this.props.update}
          validate={["required"]}
          placeholder="Type your name here"
          label="Your name"
        >
          {({ value, onChange, onBlur, placeholder }) => (
            <input
              placeholder={placeholder}
              value={value}
              onChange={e => onChange(e.target.value)}
              onBlur={onBlur}
            />
          )}
        </Input>

        <Input
          registerValidation={this.registerValidation}
          value={this.props.fields.email}
          onChange={this.props.update}
          name="email"
          validate={["required", "email"]}
          placeholder="Type your email here"
          label="E-mail"
        >
          {({ value, onChange, onBlur, placeholder }) => (
            <input
              placeholder={placeholder}
              value={value}
              onChange={e => onChange(e.target.value)}
              onBlur={onBlur}
            />
          )}
        </Input>

        <Input
          registerValidation={this.registerValidation}
          value={this.props.fields.question}
          onChange={this.props.update}
          name="question"
          validate={["required"]}
          placeholder="Type your question here"
          label="Question"
        >
          {({ value, onChange, onBlur, placeholder }) => (
            <textarea
              placeholder={placeholder}
              value={value}
              onChange={e => onChange(e.target.value)}
              onBlur={onBlur}
            />
          )}
        </Input>

        <Input
          registerValidation={this.registerValidation}
          value={this.props.fields.canContactByPhone}
          onChange={this.props.update}
          defaultValue={false}
          name="canContactByPhone"
          label="Can contact by phone number?"
        >
          {({ value, onChange }) => (
            <input
              type="checkbox"
              checked={value}
              onChange={e => onChange(e.target.checked)}
            />
          )}
        </Input>

        {this.props.fields.canContactByPhone && (
          <Input
            registerValidation={this.registerValidation}
            value={this.props.fields.phone}
            onChange={this.props.update}
            name="phone"
            validate={["required", "phone"]}
            placeholder="Type your phone number"
            label="Phone number"
          >
            {({ value, onChange, onBlur, placeholder }) => (
              <input
                placeholder={placeholder}
                value={value}
                onChange={e => onChange(e.target.value)}
                onBlur={onBlur}
              />
            )}
          </Input>
        )}

        <button type="submit" onClick={this.submit}>
          Submit
        </button>
      </form>
    );
  }
}

export const ContactForm = connect(
  state => ({ fields: state.simple.contactForm }),
  dispatch => bindActionCreators({ update, reset }, dispatch)
)(ContactFormBase);
