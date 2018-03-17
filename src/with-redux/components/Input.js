import React, { Component } from "react";
import { validators } from "../validators";

export class Input extends Component {
  static defaultProps = {
    validate: []
  };

  state = {
    errors: []
  };

  componentWillMount = () => {
    if (this.props.defaultValue) {
      this.onChange(this.props.defaultValue);
    }

    this.removeValidationFromContext = this.props.registerValidation(
      this.isValid.bind(this)
    );
  };

  componentWillUnmount = () => {
    this.removeValidationFromContext();
  };

  onChange = value => {
    this.props.onChange(this.props.name, value);

    if (this.state.errors.length) {
      this.isValid(true);
    }
  };

  isValid = (showErrors = false) => {
    console.log(this.props.label);
    const errors = this.props.validate.reduce(
      (memo, currentName) =>
        memo.concat(validators[currentName](this.props.value)),
      []
    );

    if (showErrors) {
      this.setState({
        errors
      });
    }

    return !errors.length;
  };

  onBlur = () => {
    this.isValid(true);
  };

  render = () => (
    <label className={this.isValid() ? "" : "invalid"}>
      {this.props.label}
      {this.props.children({
        value: this.props.value || "",
        placeholder: this.props.placeholder,
        onChange: this.onChange,
        onBlur: this.onBlur
      })}
      {this.state.errors.map((error, i) => <div key={i}>{error}</div>)}
    </label>
  );
}
