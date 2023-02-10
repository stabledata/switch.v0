import React from 'react';
import { useRDF } from './useRDF';
import type { RDFOptions, RDFFieldOptions } from './useRDF';
import type { FieldErrors, FieldValues, RegisterOptions, UseFormRegister } from 'react-hook-form';
import * as Label from '@radix-ui/react-label';

export type RDFProps<T> = {
  options: RDFOptions
  submitButtonLabel: string
  handleSubmit: (data: T) => void | T
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
  multiline?: boolean
}

/**
 *
 * @props see {@link RDFFieldProps}
 * @returns text field with given options
 */
export function RDFTextField({
  name,
  label,
  placeholder,
  options,
  register,
  errors,
  multiline,
}: RDFTextFieldProps) {
  const labelClasses = ['label', `label-${name}`]
  const inputClasses = ['input', `input-${name}`]
  const error = errors[name]
  if (error) {
    inputClasses.push('input-has-error')
    labelClasses.push('label-has-error')
  }
  return (
    <div className={`field text-input field-${name}`}>
      <Label.Root className={labelClasses.join(' ')} htmlFor={name}>
        {label}
      </Label.Root>
      {multiline
        ? <textarea
            className={['input-multiline', ...inputClasses].join(' ')}
            id={name}
            placeholder={placeholder}
            {...register(name, options)}
          />
        : <input
            className={inputClasses.join(' ')}
            type="text" id={name}
            placeholder={placeholder}
            {...register(name, options)}
          />
      }
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
    // watch,
    handleSubmit: rhfSubmitHandler
  } = useRDF(options)

  return (
    <form onSubmit={rhfSubmitHandler(handleSubmit)}>
      {fields.map((field) => {
        switch (field.type) {
          // text field
          case 'text':
          case 'multiline':
            return (
              <RDFTextField
                name={field.name}
                label={field.label}
                placeholder={field.placeholder}
                register={register}
                options={field.options}
                errors={errors}
                multiline={field.type === 'multiline'}
              />
            )
        }
      })}
      <button type="submit">{submitButtonLabel}</button>
    </form>
  )
}
