import React, { ReactNode } from 'react';
import { Controller } from 'react-hook-form';
import { Label } from '@radix-ui/react-label';
import { RDFControlledInputProps, RDFFieldProps } from './RDF';
import * as Select from '@radix-ui/react-select';
import { RDFErrorMessage, RDFHelpText } from './RDFHelpers';
import { RDFTextFieldProps } from './RDFTextField';

export type Choice = string | { label: string, value: string }  // for selects
export type RDFSelectProps = RDFControlledInputProps & RDFTextFieldProps & {
  choices: Choice[]
}

/**
 *
 * @props see {@link RDFFieldProps}
 * @returns field with given options
 */
export const RDFSelect = ({
  name,
  label,
  placeholder,
  helper,
  choices,
  control,
  options,
  errors,
  disabled,
  hidden
}: RDFSelectProps) => {
  const labelClasses = ['label', `label-${name}`];
  const inputClasses = ['input', `input-${name}`];
  const error = errors[name];
  if (error) {
    inputClasses.push('input-has-error');
    labelClasses.push('label-has-error');
  }

  const render = ({ field }) => {
    return (
      <div className={`field field-${name} ${disabled ? 'select-disabled' : ''} ${hidden ? 'select-hidden' : ''}`}>
        <div className="select-wrap">
          <Label className={labelClasses.join(' ')} htmlFor={name}>
            {label}
          </Label>
          <RadixSelect
            field={field}
            choices={choices}
            placeholder={placeholder}
            inputClasses={inputClasses}
            disabled={disabled}
          />
          <RDFHelpText helper={helper} />
          <RDFErrorMessage error={error} />
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

const ChevronDownIcon = () => (
  <svg className="icon down-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
  </svg>
);

const ChevronUpIcon = () => (
  <svg className="icon up-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
  </svg>
);

export const CheckIcon = () => (
  <svg className="icon down-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
  </svg>
);

const RadixSelect = ({ field, choices, placeholder, disabled, inputClasses }) => {
  return (
    <Select.Root onValueChange={field.onChange} value={field.value} disabled={disabled}>
      <Select.Trigger className={['select-trigger', ...inputClasses].join(' ')} aria-label="Food">
        <Select.Value placeholder={placeholder} />
        <Select.Icon className="select-icon">
          <ChevronDownIcon />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className="select-content">
          <Select.ScrollUpButton className="select-scroll-button">
            <ChevronUpIcon />
          </Select.ScrollUpButton>
          <Select.Viewport className="select-viewport">
            <Select.Group>
            {choices.map((choice: string, index: number) => {
              const { label, value, disabled } = typeof choice === 'object'
              ? choice
              : { label: choice, value: choice, disabled: false };

              if (value.indexOf('---') === 0) {
                return <Select.Label
                  key={`${choice}-${index}`}
                  className="select-label">{choice.substring(3)}
                </Select.Label>;
              }

              return <SelectItem
                key={`${value}-${index}`}
                value={value}
                disabled={disabled}
              >
                {label}
              </SelectItem>;

            })}
            </Select.Group>
          </Select.Viewport>
          <Select.ScrollDownButton className="select-scroll-button">
            <ChevronDownIcon />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Portal>
  </Select.Root>
);};

type SelectItemProps = {
  value: string
  children?: ReactNode
  className?: string
  disabled?: boolean
  displayName?: string
}

export type Ref = HTMLDivElement;

const SelectItem = React.forwardRef<Ref, SelectItemProps>((props, ref) => {
  const { children, className = 'select-item', value, ...rest } = props;
  return (
    <Select.Item className={className} value={value} ref={ref} {...rest}>
      <Select.ItemText>{children}</Select.ItemText>
      <Select.ItemIndicator className="item-indicator">
        <CheckIcon />
      </Select.ItemIndicator>
    </Select.Item>
  );
});

// fixes lint error
SelectItem.displayName = 'SelectItem';