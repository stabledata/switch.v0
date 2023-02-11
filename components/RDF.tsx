import React from 'react';
import { useRDF } from './useRDF';
import type { RDFOptions } from './useRDF';
import { RDFTextField } from './RDFTextField';
import type { UseFormRegister, FieldValues, RegisterOptions, FieldErrors, Control } from "react-hook-form"
import { RDFCheckbox } from './RDFCheckbox';
import { RDFSelect } from './RDFSelect';

export type RDFProps<T> = {
  options: RDFOptions
  submitButtonLabel: string
  handleSubmit: (data: T) => void | T
}

export type RDFFieldProps = {
  name: string
  label?: string
  helper?: string | (() => JSX.Element)
  // react hook form
  register: UseFormRegister<FieldValues>
  options: RegisterOptions
  errors: FieldErrors
}

export type RDFControlledInputProps = RDFFieldProps & {
  control: Control<FieldValues, unknown>
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
    control,
    handleSubmit: rhfSubmitHandler
  } = useRDF(options)

  return (
    <form onSubmit={rhfSubmitHandler(handleSubmit)}>
      {fields.map((field, index) => {
        switch (field.type) {
          // text field
          case 'text':
          case 'multiline':
            return (
              <RDFTextField
                key={`${field.name}-${index}`}
                name={field.name}
                label={field.label}
                placeholder={field.placeholder}
                register={register}
                options={field.options}
                multiline={field.type === 'multiline'}
                helper={field.helpText || field.HelpText}
                errors={errors}
              />
            )
          // checkbox
          case 'checkbox':
            return (
              <RDFCheckbox
                key={`${field.name}-${index}`}
                name={field.name}
                label={field.label}
                control={control}
                register={register}
                options={field.options}
                helper={field.helpText || field.HelpText}
                errors={errors}
              />
            )
          // select
          case 'select':
            return (
              <RDFSelect
                key={`${field.name}-${index}`}
                name={field.name}
                label={field.label}
                control={control}
                register={register}
                options={field.options}
                choices={field.choices}
                placeholder={field.placeholder}
                helper={field.helpText || field.HelpText}
                errors={errors}
              />
            )
        }
      })}
      <button type="submit" className="submit">{submitButtonLabel}</button>
    </form>
  )
}
