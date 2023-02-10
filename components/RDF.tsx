import React from 'react';
import { useRDF } from './useRDF';
import type { RDFOptions, RDFTextFieldOptions } from './useRDF';
import type { FieldValues, UseFormRegister } from 'react-hook-form';
import * as Label from '@radix-ui/react-label';

export type RDFProps<T> = {
  options: RDFOptions
  submitButtonLabel: string
  handleSubmit: (data: T) => void | T
  debug?: boolean
}

export type RDFFieldProps = {
  register: UseFormRegister<FieldValues>
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
export const RDFTextField = ({ name, label, placeholder, register }: RDFTextFieldProps) => {
  return (
    <div className="field text-input">
      <Label.Root className="label" htmlFor={name}>
        {label}
      </Label.Root>
      <input className="input" type="text" id={name} placeholder={placeholder} {...register(name)} />
    </div>
  )
}

/**
 *
 * @param options
 * @returns The RDF form component based on options configuration
 */
export function RDF<T>({
  options,
  debug,
  handleSubmit,
  submitButtonLabel
}: RDFProps<T>) {
  const {
    fields,
    register,
    formState,
    // watch,
    handleSubmit: rhfSubmitHandler
  } = useRDF(options)

  return (
    <form onSubmit={rhfSubmitHandler(handleSubmit)}>
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
              />
            )
        }
      })}
      <button type="submit">{submitButtonLabel}</button>

      {debug
        ? <div className="rhf-debug">
            <p>Internal RHF State:</p>
            <pre>{JSON.stringify(formState, null, 2)}</pre>
          </div>
        : null
      }
    </form>
  )
}
