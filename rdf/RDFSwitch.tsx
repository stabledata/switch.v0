import { Controller } from 'react-hook-form';
import { Label } from '@radix-ui/react-label';
import { RDFControlledInputProps, RDFFieldProps } from './RDF';
import * as Switch from '@radix-ui/react-switch';
import { RDFErrorMessage, RDFHelpText } from './RDFHelpers';

export type RDFSwitchProps = RDFControlledInputProps & {
  defaultValue: boolean
}

/**
 *
 * @props see {@link RDFFieldProps}
 * @returns field with given options
 */
export const RDFSwitch = ({
  name,
  label,
  helper,
  control,
  options,
  errors,
  disabled,
  hidden,
  defaultValue
}: RDFSwitchProps) => {
  const labelClasses = ['label', `label-${name}`];
  const inputClasses = ['input', `input-${name}`];
  const error = errors[name];
  if (error) {
    inputClasses.push('input-has-error');
    labelClasses.push('label-has-error');
  }

  const render = ({ field }) => {
    return (
      <div className={`field field-${name} ${disabled ? 'switch-disabled' : ''} ${hidden ? 'switch-hidden' : ''}`}>
        <div className="switch-wrap">
        <Label className={labelClasses.join(' ')} htmlFor={name}>
            {label}
          </Label>
          <RadixSwitch
            field={field}
            id={name}
            disabled={disabled}
            defaultValue={defaultValue}
          />
        </div>
        <RDFErrorMessage error={error} />
        <RDFHelpText helper={helper} />
      </div>
    );
  };

  return (
    <Controller
      name={name}
      control={control}
      rules={options}
      render={render}
    />
  );
};

const RadixSwitch = ({ field, id, disabled, defaultValue }) => {
  return (
    <Switch.Root
      className="switch"
      id={id}
      onCheckedChange={field.onChange}
      disabled={disabled}
      defaultChecked={defaultValue}
    >
      <Switch.Thumb className="switch-toggle" />
    </Switch.Root>
  );
};
