import { RDFChoiceOption, RDFField, RDFForm, useRDFInternal } from './useRDF';
import { RDFTextField } from './RDFTextField';
import type {
  UseFormRegister,
  FieldValues,
  RegisterOptions,
  FieldErrors,
  Control
} from 'react-hook-form';
import { RDFCheckbox } from './RDFCheckbox';
import { RDFSelect } from './RDFSelect';
import { RDFRadio } from './RDFRadios';
import { RDFSwitch } from './RDFSwitch';
import { RDFMedia } from './RDFMedia';
import { RDFList } from './RDFList';
import { RDFTable } from './RDFTable';

export type RDFProps<T> = {
  form: RDFForm<T>
  submitButtonLabel?: string | React.ReactNode
  submitButtonLabelInFlight?: string | React.ReactNode
  isInFlight?: boolean
}

export type RDFFieldProps = {
  name: string
  label?: string
  helper?: string | ((state?: any) => JSX.Element)
  disabled?: boolean | ((state?: any) => boolean)
  hidden?: boolean | ((state?: any) => boolean)
  // react hook form
  register?: UseFormRegister<FieldValues>
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
  form,
  submitButtonLabel = 'Send it',
  submitButtonLabelInFlight = 'Sending...',
  isInFlight = false,
}: RDFProps<T>) {
  const {
    register,
    errors,
    control,
    changedState,
    handleSubmit: rhfSubmitHandler,
    handleSubmitWithFormData
  } = useRDFInternal<T>(form);

  return (
    <form onSubmit={rhfSubmitHandler(handleSubmitWithFormData)}>
      {form.fields
        .map((field: RDFField<T>) => {
          // if any of the field entry values are a function,
          // call it to produce the new field
          return Object.entries(field).map(([key, value]) => {
            return {
              name: key,
              value: typeof value === 'function'
                ? value(changedState)
                : value
            };
          }).reduce((builder, { name, value }) => ({
            ...builder,
            [name]: value
          }), {});
        })
        .map((field: RDFField<T>, index) => {
          switch (field.type) {
            // text field
            case 'text':
            case 'multiline':
            case 'number':
            case 'email':
            case 'password':
              return (
                <RDFTextField
                  key={`${field.name}-${index}`}
                  type={field.type }
                  name={field.name}
                  label={field.label}
                  placeholder={field.placeholder}
                  options={field.options}
                  helper={field.helpText || field.HelpText}
                  disabled={field.disabled}
                  hidden={field.hidden}
                  register={register}
                  errors={errors}
                />
              );
            // text field
            case 'media':
              return (
                <RDFMedia
                  key={`${field.name}-${index}`}
                  name={field.name}
                  label={field.label}
                  options={field.options}
                  helper={field.helpText || field.HelpText}
                  previewType={field.previewType}
                  disabled={field.disabled}
                  hidden={field.hidden}
                  control={control}
                  errors={errors}
                />
              );
            // checkbox
            case 'checkbox':
              return (
                <RDFCheckbox
                  key={`${field.name}-${index}`}
                  name={field.name}
                  label={field.label}
                  options={field.options}
                  disabled={field.disabled}
                  hidden={field.hidden}
                  helper={field.helpText || field.HelpText}
                  control={control}
                  register={register}
                  errors={errors}
                />
              );
            // switch
            case 'switch':
              return (
                <RDFSwitch
                  key={`${field.name}-${index}`}
                  name={field.name}
                  label={field.label}
                  options={field.options}
                  helper={field.helpText || field.HelpText}
                  disabled={field.disabled}
                  hidden={field.hidden}
                  defaultValue={field.default as boolean}
                  control={control}
                  register={register}
                  errors={errors}
                />
              );
            // select
            case 'select':
              return (
                <RDFSelect
                  key={`${field.name}-${index}`}
                  name={field.name}
                  label={field.label}
                  options={field.options}
                  choices={field.choices as RDFChoiceOption[]}
                  placeholder={field.placeholder}
                  helper={field.helpText || field.HelpText}
                  disabled={field.disabled}
                  hidden={field.hidden}
                  control={control}
                  register={register}
                  errors={errors}
                />
              );
            // radio
            case 'radio':
              return (
                <RDFRadio
                  key={`${field.name}-${index}`}
                  name={field.name}
                  label={field.label}
                  options={field.options}
                  choices={field.choices as RDFChoiceOption[]}
                  placeholder={field.placeholder}
                  helper={field.helpText || field.HelpText}
                  disabled={field.disabled}
                  hidden={field.hidden}
                  control={control}
                  register={register}
                  errors={errors}
                />
              );
            // list
            case 'list':
              return (
                <RDFList
                  key={`${field.name}-${index}`}
                  name={field.name}
                  label={field.label}
                  options={field.options}
                  placeholder={field.placeholder}
                  helper={field.helpText || field.HelpText}
                  disabled={field.disabled}
                  hidden={field.hidden}
                  control={control}
                  register={register}
                  errors={errors}
                  addItemText={field.addItemButtonText}
                />
              );

            // table
            case 'table':
              return (
                <RDFTable
                  key={`${field.name}-${index}`}
                  name={field.name}
                  label={field.label}
                  options={field.options}
                  helper={field.helpText || field.HelpText}
                  disabled={field.disabled}
                  hidden={field.hidden}
                  control={control}
                  register={register}
                  errors={errors}
                  addItemText={field.addItemButtonText}
                  columns={field.columns}
                />
              );
        }
      })}
      <button type="submit" className="submit" disabled={isInFlight}>
        {isInFlight ? submitButtonLabelInFlight : submitButtonLabel}
      </button>
    </form>
  );
}
