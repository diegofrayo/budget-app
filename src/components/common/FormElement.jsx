// npm libs
import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

// theme
import { createStyledComponentWithProps } from 'styles';

const Container = createStyledComponentWithProps(
  'label',
  ({ theme, error, required }) => `
    cursor: pointer;
    margin-bottom: ${theme.spacing[5]};
    width: 100%;

    &:last-child {
      margin-bottom: 0;
    }

    .label-text {
      display: block;
      font-weight: bold;
      margin-bottom: ${theme.spacing[0]};
      padding-left: ${theme.spacing[0]};
      text-transform: uppercase;

      ${required &&
        `
        &::after {
          color: red;
          content: '*';
          margin-left: ${theme.spacing[1]};
        }
      `}
    }

    .input-element {
      background-color: #f3f3f3;
      border-radius: 5px;
      border: 1px solid #dedede;
      font-size: ${theme.fontSize[2]};
      height: 40px;
      outline: 0;
      padding:${theme.spacing[0]};
      width: 100%;

      &:focus {
        background-color: #f9fdff;
        border: 1px solid #00a5ff;
        box-shadow: ${theme.shadow.base('#00a5ff')};
      }
    }

    .textarea {
      height: 150px;
      resize: none;
    }

    .error-message {
      color: #bd0d0d;
      font-size: ${theme.fontSize[1]};
      font-style: italic;
      font-weight: bold;
      padding: ${theme.spacing[0]} ${theme.spacing[1]};
      text-align: right;
    }

    ${
      error
        ? `
      color: #bd0d0d;

      .input-element {
        background-color: #fff4f4;
        border-radius: 0;
        border: 1px solid #ffb8b8;
        color: #bd0d0d;

        &:focus {
          background-color: #fff4f4;
          border: none;
          box-shadow: ${theme.shadow.base('#ffb8b8')};
        }
      }
    `
        : ''
    }
  `
);

const FormElement = ({
  label,
  name,
  required,
  defaultValue,
  value,
  element,
  component,
  errorMessage,
  uiProps,
  inputProps,
  onChangeInput,
}) => {
  const Element = component || element;
  return (
    <Container
      key={name}
      htmlFor={name}
      error={errorMessage}
      required={required && (!uiProps || !uiProps.disableRequiredAsterisk)}
    >
      {label && <span className="label-text">{label}</span>}
      <Element
        id={name}
        name={name}
        value={value || defaultValue || ''}
        className={classnames(
          'input-element',
          inputProps.type,
          element,
          inputProps.className
        )}
        onChange={onChangeInput}
        {...inputProps}
      />
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </Container>
  );
};

FormElement.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
  defaultValue: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.number,
    PropTypes.object,
    PropTypes.string,
  ]),
  value: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.number,
    PropTypes.object,
    PropTypes.string,
  ]),
  element: PropTypes.string.isRequired,
  component: PropTypes.func,
  errorMessage: PropTypes.string,
  uiProps: PropTypes.object,
  inputProps: PropTypes.object,
  onChangeInput: PropTypes.func.isRequired,
};

FormElement.defaultProps = {
  required: false,
  defaultValue: '',
  value: '',
  component: null,
  errorMessage: '',
  uiProps: {},
  inputProps: {},
};

export default FormElement;
