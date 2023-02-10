import React from 'react';
import { Label } from "@radix-ui/react-label";
import { RDFFieldProps } from "./RDF";
import * as Checkbox from '@radix-ui/react-checkbox';
import { CheckIcon } from '@radix-ui/react-icons';

// export type RDFCheckboxProps = RDFFieldProps & {

// }

/**
 *
 * @props see {@link RDFFieldProps}
 * @returns text field with given options
 */
export const RDFCheckbox = ({
  name,
  label,
  helper,
  options,
  register,
  errors,
}: RDFFieldProps) => {
  const labelClasses = ['label', `label-${name}`]
  const inputClasses = ['input', `input-${name}`]
  const error = errors[name]
  if (error) {
    inputClasses.push('input-has-error')
    labelClasses.push('label-has-error')
  }

  return (
    <div className={`field field-${name}`}>
      <div className="checkbox-wrap">
        <RadixCheckbox />
        <Label className={labelClasses.join(' ')} htmlFor={name}>
          {label}
        </Label>
      </div>
      <div className="instructions">
        {error && error.message > ''
          ? <span className="error-message">{error.message as string}</span>
          : null
        }
        {typeof helper === 'string'
          ? <span className="field-help-text">{helper}</span>
          : null
        }
        {typeof helper === 'function'
          ? helper()
          : null
        }
      </div>
    </div>
  )
}

const RadixCheckbox = () => {
  return (
    <Checkbox.Root className="checkbox" defaultChecked id="c1">
      <Checkbox.Indicator className="checkbox-indicator">
        <CheckIcon />
      </Checkbox.Indicator>
    </Checkbox.Root>
  )
}
