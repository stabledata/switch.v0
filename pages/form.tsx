import type { RDFOptions } from '../components/useRDF';

export const options: RDFOptions = {
  fields: [
    {
      type: 'text',
      name: 'simple',
      label: 'A Simple Text Entry',
      placeholder: 'This is placeholder text'
    },

    // validation testing from rhf
    // https://react-hook-form.com/get-started#Applyvalidation
    {
      type: 'text',
      name: 'necessary',
      label: 'A Required Text Field',
      placeholder: 'you better enter something here',
      options: {
        required: 'This field is required, fill it out!'
      }
    },
    // max len
    {
      type: 'text',
      name: 'max',
      label: 'Short Code',
      placeholder: '123',
      options: {
        maxLength : {
          value: 3,
          message: 'You can only enter 3 characters in this field'
        }
      },
    },
    // custom validation
    {
      type: 'text',
      name: 'customizing',
      label: 'Enter anything that contains "ing"',
      placeholder: 'e.g. Running',
      options: {
        validate: ((value) => {
          if (value.indexOf('ing') < 0) {
            return 'That input does not contain "ing"'
          }
        })
      }
    },
    // multiline input
    {
      type: 'multiline',
      name: 'story',
      label: 'Tell us your story',
      placeholder: 'This is a longer input option',
      helpText: 'If you need some inspiration, read this help text'
    },
    // checkbox (radix)
    {
      type: 'checkbox',
      name: 'accept-terms',
      label: 'I accept the terms of the agreement',
      HelpText: () => (<div>To continue, you must accept the <a href="#">terms</a></div>),
      options: {
        required: 'You must accept the terms!',

      }
    },
  ]
};