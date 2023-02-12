import { format } from 'path';
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

export type RDFChoiceOption<T> =
  string |
  {
    label: string
    value: string
    disabled?: boolean
  }

export type RDFField<T> = {
  type: RDFFieldType
  name: string
  label?: string
  default?: string
  helpText?: string
  placeholder?: string
  previewType?: MediaPreviewType // for media uploads
  observe?: boolean
  HelpText?: (state?: Partial<T>) => JSX.Element
  choices?: RDFChoiceOption<T>[]  | ((state?: Partial<T>) => RDFChoiceOption<T>[])
  disabled?: boolean | ((state?: Partial<T>) => boolean)
  hidden?: boolean | ((state?: Partial<T>) => boolean)
  // react hook form options
  // (second argument to register)
  // https://react-hook-form.com/api/useform/register
  options?: RegisterOptions
}

export type UseRDFInternalHookReturn<T> =  Partial<UseFormReturn> & {
  errors?: FieldErrors
  handleSubmitWithFormData: (data: T) => FormData,
  changedState: Partial<T>
}

export type RDFForm<T> = UseFormReturn & {
  onSubmit: (fd: FormData, data?: T) => void,
  fields: RDFField<T>[]
}

export const useRDF = <T>(
  fields: RDFField<T>[],
  onSubmit: (fd: FormData, data?: T) => void
): RDFForm<T> => {
  // collect default values
  const defaultValues = Object.values(fields)
    .filter((field: RDFField<T>) => field.default) // only apply defaults
    .map((field: RDFField<T>) => ({
      name: field.name,
      value: field.default
    }))
    .reduce((builder, { name, value }) => ({
      ...builder,
      [name]: value
    }), {});

   const form = useForm({ defaultValues });

   return {
    ...form,
    fields,
    onSubmit
   };
};

export const useRDFInternal = <T>(
  form: RDFForm<T>
): UseRDFInternalHookReturn<T> => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
    onSubmit,
  } = form;

  // observe specified fields
  const changedState = Object.values(form.fields)
    .filter((field: RDFField<T>) => field.observe)
    .map((field: RDFField<T>) => ({
      name: field.name,
      value: watch(field.name)
    }))
    .reduce((builder, { name, value }) => ({
      ...builder,
      [name]: value
    }), {});

  // transform results into FormData
  const handleSubmitWithFormData = (data: T): FormData => {
    const fd = new FormData();
    const finalState = {};
    // append each field to form data depending on file type
    Object.entries(data)
      .filter(([_, value]) => !!value) // only send defined fields
      .forEach(([key, value]) => {
        if (value instanceof File) {
          fd.append(key, value, value.name);
          // make the stateful object friendlier
          finalState[key] = {
            name: value.name,
            type: value.type,
            size: value.size
          };
        } else {
          fd.set(key, value);
          finalState[key] = value;
        }
      });

    // for now, we can just submit to wrapper
    onSubmit(fd, finalState as T);

    // TODO:
    // 1 - options to perform the POST, headers etc as configuration
    // 2 - think about how to handle in flight state on consumer end etc.
    return fd;
  };

  return {
    register,
    control,
    changedState,
    handleSubmit,
    handleSubmitWithFormData,
    errors
  };
};
