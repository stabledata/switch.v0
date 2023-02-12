import { stringify } from 'querystring';
import { useState } from 'react';
import { FieldErrors, useForm } from 'react-hook-form';
import type {
  UseFormReturn,
  RegisterOptions
} from 'react-hook-form';

export type RDFFieldType = 'text' |
  'multiline' |
  'checkbox' |
  'select' |
  'radio' |
  'switch' |
  'media'

export type MediaPreviewType =
  'hero' |
  'thumb'

export type RDFFieldOptions = {
  type: RDFFieldType
  name: string
  label?: string
  helpText?: string
  HelpText?: () => JSX.Element
  placeholder?: string
  options?: RegisterOptions
  choices?: (string | { label: string, value: string, disabled?: boolean })[]  // for selects
  previewType?: MediaPreviewType // for media uploads
}

export type RDFField = RDFFieldOptions

// options for the entire form
export type RDFOptions = {
  onSubmit: (fd: FormData) => void
  fields: RDFField[]
}

export type UseRDFHookReturn<T> =  Partial<UseFormReturn> & {
  fields: RDFField[]
  errors?: FieldErrors
  handleSubmitWithFormData: (data: T) => FormData,
}

export const useRDF = <T>(options: RDFOptions): UseRDFHookReturn<T> => {
  const [formData, useFormData] = useState<FormData>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    control
  } = useForm()


  // transform results into FormData
  const handleSubmitWithFormData = (data: T): FormData => {
    const fd = new FormData();
    // append each field to form data depending on file type
    Object.entries(data)
      .filter(([key, value]) => !!value) // only send defined fields
      .forEach(([key, value]) => {
        const fileName = value && value.name
          ? value.name
          : undefined;
        fd.set(key, value. fileName)
      });

    // for now, we can just submit to wrapper
    // since this is being defined
    options.onSubmit(fd);

    // TODO:
    // 1 - options to perform the POST, headers etc.
    // 2 - think about how to handle in flight state on consumer end
    return fd;
  }

  return {
    fields: options.fields,
    register,
    control,
    handleSubmit,
    handleSubmitWithFormData,
    errors
  };
}