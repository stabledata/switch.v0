import React from 'react';
import { Controller } from 'react-hook-form';
import { Label } from '@radix-ui/react-label';
import { RDFControlledInputProps, RDFFieldProps } from './RDF';
import * as RadioGroup from '@radix-ui/react-radio-group';
import { CheckIcon } from '@radix-ui/react-icons';
import { RDFErrorMessage, RDFHelpText } from './RDFHelpers';
import { RDFTextFieldProps } from './RDFTextField';

export type Choice = string | { label: string, value: string }  // for selects
export type RDFRadioProps = RDFControlledInputProps & RDFTextFieldProps & {
  choices: Choice[]
}

/**
 *
 * @props see {@link RDFFieldProps<T>}
 * @returns field with given options
 */
export const RDFRadio = ({
  name,
  label,
  choices,
  helper,
  control,
  options,
  errors,
  disabled
}: RDFRadioProps) => {
  const labelClasses = ['label', `label-${name}`];
  const inputClasses = ['input', `input-${name}`];
  const error = errors[name];
  if (error) {
    inputClasses.push('input-has-error');
    labelClasses.push('label-has-error');
  }

  const render = ({ field }) => {
    return (
      <div className={`field field-${name} ${disabled ? 'radio-group-disabled' : ''}`}>
        <div className="radio-group-wrap">
          <Label className={labelClasses.join(' ')} htmlFor={name}>
            {label}
          </Label>
          <RDFErrorMessage error={error} />
          <RDFHelpText helper={helper} />
          <RadixRadioGroup
            field={field}
            inputClasses={inputClasses}
            id={name}
            choices={choices}
            allDisabled={disabled as boolean}
          />
        </div>
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

const RadixRadioGroup = ({ field, id, choices, allDisabled = false, inputClasses }) => {
  return (
    <RadioGroup.Root
      defaultValue="default"
      aria-label="View density"
      onValueChange={field.onChange}
      id={id}
    >
      {choices.map((choice: string, index: number) => {
        const { label, value, disabled = allDisabled } = typeof choice === 'object'
          ? choice
          : { label: choice, value: choice, disabled: allDisabled };

        return (
          <div className={`radio-wrap ${disabled ? 'radio-disabled' : ''}`} key={`${label}-${index}`}>
            <RadioGroup.Item
              className="radio"
              value={value}
              id={value}
              disabled={disabled}
            >
              <RadioGroup.Indicator className="radio-group-indicator" />
            </RadioGroup.Item>
            <label htmlFor={value}>
              {label}
            </label>
          </div>
        );
      })}
    </RadioGroup.Root>
  );
};
