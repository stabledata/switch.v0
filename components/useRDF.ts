
import { ReactElement } from 'react';
import { FieldErrors, useForm } from 'react-hook-form';
import type { UseFormReturn, RegisterOptions } from 'react-hook-form';

export type RDFFieldType = 'text' |
  'multiline' |
  'checkbox' |
  'select' |
  'radio' |
  'switch' |
  'media'

export type RDFFieldOptions = {
  type: RDFFieldType
  name: string
  label?: string
  helpText?: string
  HelpText?: () => JSX.Element
  placeholder?: string
  options?: RegisterOptions
  choices?: (string | { label: string, value: string, disabled?: boolean })[]  // for selects
}

export type RDFField = RDFFieldOptions

// options for the entire form
export type RDFOptions = {
  fields: RDFField[]
}

export type UseRDFHookReturn = RDFOptions & Partial<UseFormReturn> & {
  errors?: FieldErrors
}

export const useRDF = (options: RDFOptions): UseRDFHookReturn => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control
  } = useForm()
  return {
    fields: options.fields,
    register,
    control,
    handleSubmit,
    errors
  };
}