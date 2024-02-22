import { Controller } from 'react-hook-form';
import { Label } from '@radix-ui/react-label';
import DatePicker from 'react-datepicker';
import { RDFControlledInputProps } from './RDF';
import { RDFErrorMessage, RDFHelpText } from './RDFHelpers';

export type RDFDatePickerProps = RDFControlledInputProps & {
    showTimeSelect?: boolean;
}

/**
 *
 * @props see {@link RDFDatePickerProps}
 * @returns field with given options
 */
export const RDFDatePicker = ({
  name,
  label,
  helper,
  control,
  options,
  errors,
  disabled,
  hidden,
  showTimeSelect = false
}: RDFDatePickerProps) => {
  const labelClasses = ['label', `label-${name}`];
  const inputClasses = ['input', `input-${name}`];
  const error = errors[name];
  if (error) {
    inputClasses.push('input-has-error');
    labelClasses.push('label-has-error');
  }

  const render = ({ field }) => {
    return (
      <div className={`field field-${name} date-picker ${disabled ? 'date-picker-disabled' : ''} ${hidden ? 'date-picker-hidden' : ''}`}>
        <Label className={labelClasses.join(' ')} htmlFor={name}>
          {label}
        </Label>
        <ControlledDatePicker field={field} showTimeSelect={showTimeSelect} />
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

const ControlledDatePicker = ({ field, showTimeSelect }) => {
  const handleChange = (date: Date) => {
    console.log('GOT DATE CHANGE!', date);
    field.onChange(date);
  };

  return (
    <DatePicker
      selected={field.value}
      onChange={handleChange}
      showTimeSelect={showTimeSelect}
    // tons of options... all need styling https://reactdatepicker.com/#example-default
    //   showMonthDropdown={true}
    //   showYearDropdown={true}
    />
  );
};
