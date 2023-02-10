import { Label } from "@radix-ui/react-label"
import { RDFFieldProps } from "./RDF"

export type RDFTextFieldProps = RDFFieldProps & {
  placeholder?: string
  multiline?: boolean
}

/**
 *
 * @props see {@link RDFTextFieldProps}
 * @returns text field with given options
 */
export const RDFTextField = ({
  name,
  label,
  placeholder,
  helper,
  options,
  register,
  errors,
  multiline,
}: RDFTextFieldProps) => {
  const labelClasses = ['label', `label-${name}`]
  const inputClasses = ['input', `input-${name}`]
  const error = errors[name]
  if (error) {
    inputClasses.push('input-has-error')
    labelClasses.push('label-has-error')
  }

  return (
    <div className={`field text-input field-${name}`}>
      <Label className={labelClasses.join(' ')} htmlFor={name}>
        {label}
      </Label>
      {multiline
        ? <textarea
            className={['input-multiline', ...inputClasses].join(' ')}
            id={name}
            placeholder={placeholder}
            {...register(name, options)}
          />
        : <input
            className={inputClasses.join(' ')}
            type="text" id={name}
            placeholder={placeholder}
            {...register(name, options)}
          />
      }
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
