import React, { ReactNode } from 'react';
import { Controller } from 'react-hook-form';
import { Label } from "@radix-ui/react-label";
import { RDFControlledInputProps, RDFFieldProps } from "./RDF";
import * as Select from '@radix-ui/react-Select';
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';
import { RDFErrorMessage, RDFHelpText } from './RDFHelpText';
import { RDFTextFieldProps } from './RDFTextField';

export type RDFSelectProps = RDFControlledInputProps & RDFTextFieldProps & {
  choices: string[]
}

/**
 *
 * @props see {@link RDFFieldProps}
 * @returns text field with given options
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
}: RDFSelectProps) => {
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
        <div className="select-wrap">
          <Label className={labelClasses.join(' ')} htmlFor={name}>
            {label}
          </Label>
          <RadixSelect
            field={field}
            choices={choices}
            placeholder={placeholder}
            inputClasses={inputClasses}
          />
        </div>
        <RDFHelpText helper={helper} />
        <RDFErrorMessage error={error} />
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

const RadixSelect = ({ field, choices, placeholder, inputClasses }) => {
  console.log('got choices?', choices)
  return (
    <Select.Root onValueChange={field.onChange} value={field.value}>
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
              if (choice.indexOf('---') === 0) {
                return <Select.Label
                  key={`${choice}-${index}`}
                  className="select-label">{choice.substring(3)}
                </Select.Label>
              }
              return <SelectItem key={`${choice}-${index}`} value={choice}>{choice}</SelectItem>

            })}
            </Select.Group>
          </Select.Viewport>
          <Select.ScrollDownButton className="select-scroll-button">
            <ChevronDownIcon />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Portal>
  </Select.Root>
)};

type SelectItemProps = {
  value: string
  children?: ReactNode
  className?: string
  disabled?: boolean
  displayName?: string
}

export type Ref = HTMLDivElement;

const SelectItem = React.forwardRef<Ref, SelectItemProps>((props, ref) => {
  const { children, className = 'select-item', value, ...rest } = props
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