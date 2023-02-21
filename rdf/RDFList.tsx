import { Controller } from 'react-hook-form';
import { Label } from '@radix-ui/react-label';
import debounce from 'debounce';
import { RDFControlledInputProps, RDFFieldProps } from './RDF';
import { RDFErrorMessage, RDFHelpText } from './RDFHelpers';
import { RDFTextFieldProps } from './RDFTextField';
import { useState } from 'react';

export type Choice = string | { label: string, value: string }  // for selects
export type RDFListProps = RDFControlledInputProps & RDFTextFieldProps & {
  addItemText?: string
}

/**
 *
 * @props see {@link RDFFieldProps<T>}
 * @returns field with given options
 */
export const RDFList = ({
  name,
  label,
  helper,
  control,
  options,
  errors,
  disabled,
  hidden,
  addItemText,
  placeholder
}: RDFListProps) => {
  const labelClasses = ['label', `label-${name}`];
  const inputClasses = ['input', `input-${name}`];
  const error = errors[name];
  if (error) {
    inputClasses.push('input-has-error');
    labelClasses.push('label-has-error');
  }

  const render = ({ field }) => {
    return (
      <div className={`field field-${name} ${disabled ? 'list-disabled' : ''} ${hidden ? 'list-hidden' : ''}`}>
        <div className="list-wrap">
          <Label className={labelClasses.join(' ')} htmlFor={name}>
            {label}
          </Label>
          <RDFErrorMessage error={error} />
          <List
            field={field}
            name={name}
            inputClasses={inputClasses}
            placeholder={placeholder}
            addItemText={addItemText}
            disabled={disabled}
          />
          <RDFHelpText helper={helper} />
        </div>
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

const List = ({ field, name, addItemText, placeholder, inputClasses, disabled }) => {
  const [listState, setListState] = useState(field.value);
  const [newItemValue, setNewItemValue] = useState('');

  const handleListItemChanges = (value: string, index: number) => {
    const newState = listState;
    newState[index] = value;
    setListState(newState);
    field.onChange(newState);
  };

  const handleNewItemValue = (e: any) =>
    setNewItemValue(e.target.value);

  const handleShiftToAdd = (e: any)  => {
    e.preventDefault();
    if (e.key === 'Shift' || e.keyCode === 16) {
      handleAddItem(e as unknown as MouseEvent);
    }
  };

  const handleAddItem = (e: any) => {
    e.preventDefault();
    setNewItemValue('');
    const newState = listState;
    newState.push(newItemValue);
    setListState(newState);
    field.onChange(newState);
  };

  const handleRemoveItem = (index: number) => {
    listState.splice(index, 1);
    field.onChange(listState);
    setListState(listState);
  };

  return (
    <div className="list-wrap">
      {listState.map((item: string, i: number) => (
        <div className="list-item-wrap" key={`${name}-${item}`}>
          <Input
            value={item}
            onChange={debounce(handleListItemChanges, 300)}
            index={i}
            inputClasses={inputClasses}
            disabled={disabled}
          />
          <button
            disabled={disabled}
            type="button"
            className="button remove-button"
            onClick={() => handleRemoveItem(i)}
          >
            X
          </button>
        </div>
      ))}
      <div className="list-item-wrap new-item-wrap">
        <input
          value={newItemValue}
          disabled={disabled}
          onChange={handleNewItemValue}
          className={inputClasses.join(' ')}
          placeholder={placeholder || 'Add a new item...'}
          onKeyUp={handleShiftToAdd}
        />
      </div>
      <button
        disabled={disabled}
        type="button"
        className="button add-item-button"
        onClick={handleAddItem}
      >
        {addItemText || 'Add Item'}
      </button>
    </div>
  );
};

type ListInputProps = {
  disabled?: boolean
  value?: string
  index: number
  placeholder?: string
  inputClasses?: string[]
  onChange: (val: any, index: number) => void
}

const Input = ({ disabled, value, index, onChange, placeholder, inputClasses }: ListInputProps) => {
  const [state, setState] = useState(value);
  const handleChange = (e) => {
    setState(e.target.value);
    onChange(e.target.value, index);
  };
  return (
    <input
      disabled={disabled}
      type="text"
      value={state}
      onChange={handleChange}
      className={inputClasses.join(' ')}
      placeholder={placeholder}
    />
  );

};
