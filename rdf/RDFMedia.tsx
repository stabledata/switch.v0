import { Label } from '@radix-ui/react-label';
import { RDFControlledInputProps } from './RDF';
import { RDFErrorMessage, RDFHelpText } from './RDFHelpers';
import { Controller } from 'react-hook-form';
import prettyBytes from './prettyBytes';
import { useRef, useState } from 'react';
import { MediaPreviewType } from './useRDF';

export type RDFMediaProps = RDFControlledInputProps & {
  previewType: MediaPreviewType
}

const CameraIcon = ({ width, height }: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" style={{ width, height }}>
    <path d="M12 9a3.75 3.75 0 100 7.5A3.75 3.75 0 0012 9z" />
    <path fillRule="evenodd" d="M9.344 3.071a49.52 49.52 0 015.312 0c.967.052 1.83.585 2.332 1.39l.821 1.317c.24.383.645.643 1.11.71.386.054.77.113 1.152.177 1.432.239 2.429 1.493 2.429 2.909V18a3 3 0 01-3 3h-15a3 3 0 01-3-3V9.574c0-1.416.997-2.67 2.429-2.909.382-.064.766-.123 1.151-.178a1.56 1.56 0 001.11-.71l.822-1.315a2.942 2.942 0 012.332-1.39zM6.75 12.75a5.25 5.25 0 1110.5 0 5.25 5.25 0 01-10.5 0zm12-1.5a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
  </svg>
);

/**
 *
 * @props see {@link RDFMediaProps}
 * @returns field with given options
 */
export const RDFMedia = ({
  name,
  label,
  helper,
  previewType,
  options,
  control,
  errors,
  disabled,
  hidden
}: RDFMediaProps) => {
  const [previewImageUrl, setPreviewImageUrl] = useState<string>(null);
  const [media, setMedia] = useState<File>(null);
  const fileInputRef = useRef(null);
  const labelClasses = ['label', `label-${name}`];
  const inputClasses = ['input', `input-${name}`];
  const error = errors[name];
  if (error) {
    inputClasses.push('input-has-error');
    labelClasses.push('label-has-error');
  }

  const render = ({ field }) => {
    const handleFileInputChange = () => {
      // TODO: a lot more
      const [file] = fileInputRef.current.files;
      setPreviewImageUrl(URL.createObjectURL(file));
      setMedia(file);
      field.onChange(file);
    };

    const handleRemoveMedia = (e: any) => {
      e.preventDefault();
      setPreviewImageUrl(null);
      setMedia(null);
      field.onChange(null);
    };

    return (
      <div className={`field field-${name} ${disabled ? 'media-disabled' : ''} ${hidden ? 'media-hidden' : ''}`}>
        <div className="media-wrap">
          <Label className={labelClasses.join(' ')} htmlFor={name}>
            {label}
          </Label>
          <RDFHelpText helper={helper} />
          <div className={`media-target media-target-${previewType}`}>
            {previewImageUrl
              ? <div
                  className="media-preview"
                  style={{ backgroundImage: `url(${previewImageUrl})`}}
                />
              : null
            }
            {!previewImageUrl
              ? <div className="media-drop">
                  <CameraIcon width={35} height={35} />
                  <p>Click or drop files</p>
                </div>
              : null
            }
            <input
              type="file"
              id={name}
              name={name}
              className="media-input"
              onChange={handleFileInputChange}
              ref={fileInputRef}
              disabled={disabled as boolean}
            />
          </div>
        </div>
        <RDFErrorMessage error={error} />
        {previewImageUrl
            ? <div className="media-info">
                <span className="file-name">{media.name}</span>
                <span className="file-type">{media.type}</span>
                <span className="file-size">{prettyBytes(media.size)}</span>
                <a href="#" className="remove-media" onClick={handleRemoveMedia}>Remove media</a>
              </div>
            : null
        }

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
