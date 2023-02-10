import type { RDFOptions } from './components/useRDF';

export const options: RDFOptions = {
  fields: [

    // simple as it gets!
    {
      type: 'text',
      name: 'simple',
      label: 'A simple entry',
      placeholder: 'Whatever you can imagine can go here'
    },

    // validation testing from rhf
    // https://react-hook-form.com/get-started#Applyvalidation
    {
      type: 'text',
      name: 'necessary',
      label: 'A required field',
      placeholder: 'You must enter something here, or else!',
      options: {
        required: 'This field is required, fill it out!'
      }
    },

    // max len
    {
      type: 'text',
      name: 'max',
      label: 'Short code',
      placeholder: '123',
      options: {
        maxLength : {
          value: 3,
          message: 'You entered more than 3 characters in this field'
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

    // select (radix)
    {
      type: 'select',
      name: 'shipping',
      label: 'Select shipping',
      placeholder: 'Select an option...',
      helpText: 'Ground deliveries can take up to seven weeks.',
      choices: [
        '---UPS',
        'UPS Ground',
        'UPS Air',
        '---Fedex',
        'FedEx Ground',
        'FedEx Air',
        '---Canal',
        'Mule',
        'Barge'
      ],
      options: {
        required: 'Select a valid shipping option to proceed with order',
      }
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