import { FieldErrors, useForm } from 'react-hook-form';
import type {
  UseFormReturn,
  RegisterOptions
} from 'react-hook-form';


export type SubmitHandler<T> = (fd: FormData, state: T) => void | Promise<void>

export type RDFForm<T> = UseFormReturn & {
  onSubmit: SubmitHandler<T>,
  fields: RDFField<T>[]
}

export type RDFFieldType =
  'text' |
  'multiline' |
  'number' |
  'email' |
  'checkbox' |
  'select' |
  'radio' |
  'switch' |
  'media' |
  'list'

export type MediaPreviewType =
  'hero' |
  'thumb'

export type RDFChoiceOption =
  string |
  {
    label: string
    value: string
    disabled?: boolean
  }

export type ListConfiguration = {
  addItemButtonText?: string
  emptyListText?: string
}

export type RDFField<T> = {
  type: RDFFieldType
  name: string
  label?: string
  default?: string | boolean | any[] // FIXME: pass list config types
  helpText?: string
  placeholder?: string
  previewType?: MediaPreviewType // for media uploads
  observe?: boolean
  HelpText?: (state?: Partial<T>) => JSX.Element
  choices?: RDFChoiceOption[]  | ((state?: Partial<T>) => RDFChoiceOption[])
  disabled?: boolean | ((state?: Partial<T>) => boolean)
  hidden?: boolean | ((state?: Partial<T>) => boolean)
  // react hook form options (second argument to register)
  // https://react-hook-form.com/api/useform/register
  options?: RegisterOptions
  // for list item
  addListItemButtonText?: string
}

export const useRDF = <T>(
  fields: RDFField<T>[],
  onSubmit: SubmitHandler<T>,
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

   // non-string defaults need to be serialized
   const form = useForm({ defaultValues });

   return {
    ...form,
    fields,
    onSubmit
   };
};

export type UseRDFInternalHookReturn<T> =  Partial<UseFormReturn> & {
  errors?: FieldErrors
  handleSubmitWithFormData: (data: T) => FormData,
  changedState: Partial<T>
}

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
    // TODO:
    // 1 - options to perform the POST, headers etc as configuration
    // 2 - think about how to handle in flight state on consumer end etc.
    // this might be async.
    void onSubmit(fd, finalState as T);

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
