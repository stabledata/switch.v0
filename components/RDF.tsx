import React from 'react';
import { RDFChoiceOption, RDFField, useRDFInternal } from './useRDF';
import type { RDFOptions } from './useRDF';
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

export type RDFProps<T> = {
  options: RDFOptions<T>
  onSubmit: (fd: FormData, data?: T) => void
  submitButtonLabel?: string
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
  options,
  onSubmit,
  submitButtonLabel = 'Send it'
}: RDFProps<T>) {
  const {
    fields,
    register,
    errors,
    control,
    changedState,
    handleSubmit: rhfSubmitHandler,
    handleSubmitWithFormData
  } = useRDFInternal<T>(options, onSubmit);

  return (
    <form onSubmit={rhfSubmitHandler(handleSubmitWithFormData)}>
      {fields
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
        // hide hidden fields
        .filter((field: RDFField<T>) => !field.hidden)
        .map((field: RDFField<T>, index) => {
          switch (field.type) {
            // text field
            case 'text':
            case 'multiline':
              return (
                <RDFTextField
                  key={`${field.name}-${index}`}
                  name={field.name}
                  label={field.label}
                  placeholder={field.placeholder}
                  options={field.options}
                  multiline={field.type === 'multiline'}
                  helper={field.helpText || field.HelpText}
                  disabled={field.disabled}
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
                  choices={field.choices as RDFChoiceOption<T>[]}
                  placeholder={field.placeholder}
                  helper={field.helpText || field.HelpText}
                  disabled={field.disabled}
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
                  choices={field.choices as RDFChoiceOption<T>[]}
                  placeholder={field.placeholder}
                  helper={field.helpText || field.HelpText}
                  disabled={field.disabled}
                  control={control}
                  register={register}
                  errors={errors}
                />
              );
        }
      })}
      <button type="submit" className="submit">{submitButtonLabel}</button>
    </form>
  );
}
