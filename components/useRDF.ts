import { fstat } from 'fs';
import { FieldErrors, useForm } from 'react-hook-form';
import type {
  UseFormReturn,
  RegisterOptions
} from 'react-hook-form';
import { RDFSwitchProps } from './RDFSwitch';

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

export type RDFFieldOptions<T> = {
  type: RDFFieldType
  name: string
  label?: string
  default?: string
  helpText?: string
  HelpText?: (state?: Partial<T>) => JSX.Element
  placeholder?: string
  choices?: RDFChoiceOption<T>[]  // for selects
  previewType?: MediaPreviewType // for media uploads
  observe?: boolean
  disabled?: boolean | ((state?: Partial<T>) => void)
  hidden?: boolean | ((state?: Partial<T>) => void)
  // react hook form options
  // (second argument to register)
  // https://react-hook-form.com/api/useform/register
  options?: RegisterOptions
}

export type RDFField<T> = RDFFieldOptions<T>

// options for the entire form
export type RDFOptions<T> = {
  fields: RDFField<T>[]
}

export type UseRDFInternalHookReturn<T> =  Partial<UseFormReturn> & {
  fields: RDFField<T>[]
  errors?: FieldErrors
  handleSubmitWithFormData: (data: T) => FormData,
  changedState: Partial<T>
}

export const useRDFInternal = <T>(
  options: RDFOptions<T>,
  onSubmit: (fd: FormData, data?: T) => void
): UseRDFInternalHookReturn<T> => {

  // collect default values
  const defaultValues = Object.values(options.fields)
    .filter((field: RDFField<T>) => field.default) // only apply defaults
    .map((field: RDFField<T>) => ({
      name: field.name,
      value: field.default
    }))
    .reduce((builder, { name, value }) => ({
      ...builder,
      [name]: value
    }), {});

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch
  } = useForm({ defaultValues });

  // observe specified fields
  const changedState = Object.values(options.fields)
    .filter((field: RDFField<T>) => field.observe)
    .map((field: RDFField<T>) => ({
      name: field.name,
      // FIXME: setting defaults results in TS issue with field name as string
      value: watch(field.name as never, field.default)
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
    fields: options.fields,
    register,
    control,
    changedState,
    handleSubmit,
    handleSubmitWithFormData,
    errors
  };
};
