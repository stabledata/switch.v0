
import { useForm } from 'react-hook-form';
import type { UseFormReturn } from 'react-hook-form';

export type RDFFieldType = 'text'

export type RDFTextFieldOptions = {
  type: RDFFieldType
  name: string
  label?: string
  placeholder?: string
}

export type RDFField = RDFTextFieldOptions

export type RDFOptions = {
  fields: RDFField[]
}

export type UseRDFHookReturn = RDFOptions & Partial<UseFormReturn> & {
  error?: string
}

export const useRDF = (options: RDFOptions): UseRDFHookReturn => {
  const { register, handleSubmit, watch, formState } = useForm()
  return {
    fields: options.fields,
    register,
    watch,
    handleSubmit,
    formState
  }
}