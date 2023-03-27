import { Controller } from 'react-hook-form';
import { Label } from '@radix-ui/react-label';
import { RDFControlledInputProps, RDFFieldProps } from './RDF';
import * as Checkbox from '@radix-ui/react-checkbox';
import { RDFErrorMessage, RDFHelpText } from './RDFHelpers';

export type RDFCheckboxProps = RDFControlledInputProps & {}

/**
 *
 * @props see {@link RDFFieldProps}
 * @returns field with given options
 */
export const RDFCheckbox = ({
  name,
  label,
  helper,
  control,
  options,
  errors,
  disabled,
  hidden
}: RDFCheckboxProps) => {
  const labelClasses = ['label', `label-${name}`];
  const inputClasses = ['input', `input-${name}`];
  const error = errors[name];
  if (error) {
    inputClasses.push('input-has-error');
    labelClasses.push('label-has-error');
  }

  const render = ({ field }) => {
    return (
      <div className={`field field-${name} ${disabled ? 'checkbox-disabled' : ''} ${hidden ? 'checkbox-hidden' : ''}`}>
        <div className="checkbox-wrap">
          <RadixCheckbox
            field={field}
            inputClasses={inputClasses}
            disabled={disabled}
            id={name}
          />
          <Label className={labelClasses.join(' ')} htmlFor={name}>
            {label}
          </Label>
        </div>
        <RDFErrorMessage error={error} />
        <RDFHelpText helper={helper} />
      </div>
    );
  };

  return (
    <Controller
      name={name}
      control={control}
      rules={options}
      render={render}
    />
  );
};

export const CheckIcon = () => (
  <svg className="icon down-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
  </svg>
);

const RadixCheckbox = ({ field, id, disabled, inputClasses }) => {
  return (
    <Checkbox.Root
      className={['checkbox', ...inputClasses].join(' ')}
      checked={field.value === true}
      onCheckedChange={field.onChange}
      disabled={disabled}
      id={id}
    >
      <Checkbox.Indicator className="checkbox-indicator">
        <CheckIcon />
      </Checkbox.Indicator>
    </Checkbox.Root>
  );
};
