import React from 'react';
import { Controller } from 'react-hook-form';
import { Label } from "@radix-ui/react-label";
import { RDFControlledInputProps, RDFFieldProps } from "./RDF";
import * as Switch from '@radix-ui/react-switch';
import { CheckIcon } from '@radix-ui/react-icons';
import { RDFErrorMessage, RDFHelpText } from './RDFHelpers';

export type RDFSwitchProps = RDFControlledInputProps & {}

/**
 *
 * @props see {@link RDFFieldProps}
 * @returns text field with given options
 */
export const RDFSwitch = ({
  name,
  label,
  helper,
  control,
  options,
  errors,
}: RDFSwitchProps) => {
  const labelClasses = ['label', `label-${name}`]
  const inputClasses = ['input', `input-${name}`]
  const error = errors[name]
  if (error) {
    inputClasses.push('input-has-error')
    labelClasses.push('label-has-error')
  }

  const render = ({ field }) => {
    return (
      <div className={`field field-${name}`}>
        <div className="switch-wrap">
        <Label className={labelClasses.join(' ')} htmlFor={name}>
            {label}
          </Label>
          <RadixSwitch
            field={field}
            id={name}
          />
        </div>
        <RDFErrorMessage error={error} />
        <RDFHelpText helper={helper} />
      </div>
    )
  }

  return (
    <Controller
      name={name}
      control={control}
      rules={options}
      render={render}
    />
  )
};

const RadixSwitch = ({ field, id }) => {
  return (
    <Switch.Root className="switch" id={id} onCheckedChange={field.onChange}>
      <Switch.Thumb className="switch-toggle" />
    </Switch.Root>
  )
};
