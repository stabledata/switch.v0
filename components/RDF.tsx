import React from 'react';
import { useRDF } from './useRDF';
import type { RDFOptions, RDFFieldOptions } from './useRDF';
import type { FieldErrors, FieldValues, RegisterOptions, UseFormRegister } from 'react-hook-form';
import * as Label from '@radix-ui/react-label';

export type RDFProps<T> = {
  options: RDFOptions
  submitButtonLabel: string
  handleSubmit: (data: T, isValid: boolean) => void | T
}

export type RDFFieldProps = {
  register: UseFormRegister<FieldValues>
  options: RegisterOptions
  errors: FieldErrors
}

export type RDFTextFieldProps = RDFFieldProps & {
  name: string
  label?: string
  placeholder?: string
}

/**
 *
 * @param fields
 * @returns text field with given options
 */
export const RDFTextField = ({ name, label, placeholder, options, register, errors }: RDFTextFieldProps) => {
  const labelClasses = ['label', `label-${name}`]
  const inputClasses = ['input', `input-${name}`]
  const error = errors[name]
  if (error) {
    inputClasses.push('input-has-error')
    labelClasses.push('label-has-error')
  }
  return (
    <div className="field text-input">
      <Label.Root className={labelClasses.join(' ')} htmlFor={name}>
        {label}
      </Label.Root>
      <input className={inputClasses.join(' ')} type="text" id={name} placeholder={placeholder} {...register(name, options)} />
      {error && error.message > ''
        ? <span className="error-message">{error.message as string}</span>
        : null
      }
    </div>
  )
}

/**
 *
 * @props options for rendering the form declaratively {@link RDFProps}
 * @returns The RDF form component based on options configuration
 */
export function RDF<T>({
  options,
  handleSubmit,
  submitButtonLabel
}: RDFProps<T>) {
  const {
    fields,
    register,
    errors,
    isValid,
    // watch,
    handleSubmit: rhfSubmitHandler
  } = useRDF(options)

  return (
    <form onSubmit={rhfSubmitHandler((data: T) => handleSubmit(data, isValid))}>
      {fields.map((field) => {
        switch (field.type) {
          // text field
          case 'text':
            return (
              <RDFTextField
                name={field.name}
                label={field.label}
                placeholder={field.placeholder}
                register={register}
                options={field.options}
                errors={errors}
              />
            )
        }
      })}
      <button type="submit">{submitButtonLabel}</button>
    </form>
  )
}
