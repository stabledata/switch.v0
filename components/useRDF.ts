
import { ReactElement } from 'react';
import { FieldErrors, useForm } from 'react-hook-form';
import type { UseFormReturn, RegisterOptions } from 'react-hook-form';

export type RDFFieldType = 'text' | 'multiline' | 'checkbox'

export type RDFFieldOptions = {
  type: RDFFieldType
  name: string
  label?: string
  helpText?: string
  HelpText?: () => JSX.Element
  placeholder?: string
  options?: RegisterOptions
}

export type RDFField = RDFFieldOptions

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