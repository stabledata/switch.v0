
import { FieldErrors, useForm } from 'react-hook-form';
import type { UseFormReturn, RegisterOptions } from 'react-hook-form';

export type RDFFieldType = 'text'

export type RDFFieldOptions = {
  type: RDFFieldType
  name: string
  label?: string
  placeholder?: string
  options?: RegisterOptions
}

export type RDFField = RDFFieldOptions

export type RDFOptions = {
  fields: RDFField[]
}

export type UseRDFHookReturn = RDFOptions & Partial<UseFormReturn> & {
  errors?: FieldErrors
  isValid: boolean
}

export const useRDF = (options: RDFOptions): UseRDFHookReturn => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm()
  return {
    fields: options.fields,
    register,
    watch,
    handleSubmit,
    errors,
    isValid: Object.keys(errors).length === 0
  }
}