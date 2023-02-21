import { Controller } from 'react-hook-form';
import { Label } from '@radix-ui/react-label';
import debounce from 'debounce';
import { useState } from 'react';
import { RDFControlledInputProps, RDFFieldProps } from './RDF';
import { RDFErrorMessage, RDFHelpText } from './RDFHelpers';
import { RDFTextFieldProps } from './RDFTextField';
import { TableColumn } from './useRDF';

export type Choice = string | { label: string, value: string }  // for selects
export type RDFTableProps = RDFControlledInputProps & RDFTextFieldProps & {
  addItemText?: string
  columns: TableColumn[]
}

/**
 *
 * @props see {@link RDFFieldProps<T>}
 * @returns field with given options
 */
export const RDFTable = ({
  name,
  label,
  helper,
  control,
  options,
  errors,
  disabled,
  hidden,
  addItemText,
  columns,
}: RDFTableProps) => {
  const labelClasses = ['label', `label-${name}`];
  const inputClasses = ['input', `input-${name}`];
  const error = errors[name];
  if (error) {
    inputClasses.push('input-has-error');
    labelClasses.push('label-has-error');
  }

  const render = ({ field }) => {
    return (
      <div className={`field field-${name} ${disabled ? 'table-disabled' : ''} ${hidden ? 'table-hidden' : ''}`}>
        <div className="table-wrap">
          <Label className={labelClasses.join(' ')} htmlFor={name}>
            {label}
          </Label>
          <RDFErrorMessage error={error} />
          <Table
            field={field}
            name={name}
            inputClasses={inputClasses}
            addItemText={addItemText}
            columns={columns}
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

const Table = ({ field, name, addItemText, columns, inputClasses, disabled }) => {
  const [tableState, setTableState] = useState(field.value ?? [{}]);
  const [newItemValue, setNewItemValue] = useState({});

  const handleTableItemChanges = (
    objectKey: string,
    value: string | number,
    index: number,
  ) => {
    const newState = tableState;
    newState[index][objectKey] = value;
    setTableState(newState);
    field.onChange(newState);
  };

  const handleAddItem = () => {
    setNewItemValue({});
    const newState = tableState;
    newState.push(newItemValue);
    setTableState(newState);
    field.onChange(newState);
  };

  const handleRemoveItem = (index: number) => {
    tableState.splice(index, 1);
    field.onChange(tableState);
    setTableState(tableState);
  };


  return (
    <div className="table-wrap">
      <div className="table-headings">
        {columns.map(
          (c: TableColumn) => (<span key={`label-${c.key}`}>{c.label}</span>)
        )}
      </div>
      {tableState.map((item: object, i: number) => (
        <div className="table-item-wrap" key={`${name}-${item}-${i}`}>
          {columns.map(
            (c: TableColumn) => (
              <Input
                disabled={disabled}
                value={item[c.key]}
                key={`${i}-${c.key}`}
                objectKey={c.key}
                onChange={debounce(handleTableItemChanges, 300)}
                index={i}
                placeholder={c.placeholder}
                inputClasses={[...inputClasses, `input-key-${c.key}`]}
              />
            )
          )}
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
      <button
        disabled={disabled}
        type="button"
        className="button add-item-button"
        onClick={handleAddItem}
      >
        {addItemText || 'Add Row'}
      </button>
    </div>
  );
};

type TableInputProps = {
  disabled?: boolean
  objectKey?: string
  value?: string
  index: number
  placeholder?: string
  inputClasses?: string[]
  onChange: (objectKey: string, val: any, index: number) => void
}

const Input = ({ disabled, objectKey, value, index, onChange, placeholder, inputClasses }: TableInputProps) => {
  const [state, setState] = useState(value);
  const handleChange = (e: any) => {
    setState(e.target.value);
    onChange(objectKey, e.target.value, index);
  };
  return (
    <input
      type="text"
      disabled={disabled}
      value={state}
      onChange={handleChange}
      className={inputClasses.join(' ')}
      placeholder={placeholder}
    />
  );

};
