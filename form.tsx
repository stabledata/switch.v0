import type { RDFOptions } from './components/useRDF';

export type FormState = {
  simple: string
  necessary: string
  code: string
}

export const options: RDFOptions<FormState> = {
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
      },
      observe: true
    },

    // max len, code validation
    {
      type: 'text',
      name: 'code',
      label: 'Short code',
      placeholder: '123',
      options: {
        maxLength : {
          value: 3,
          message: 'You entered more than 3 characters in this field'
        }
      },
      observe: true
    },
    // hidden code field (stateful logic)
    {
      type: 'switch',
      name: 'secret-switch',
      label: 'Activate super secret code',
      hidden: (observableState: Partial<FormState>) => {
        return observableState.code !== '123';
      }
    },

    // custom validation
    {
      type: 'text',
      name: 'customizing',
      label: 'Enter anything that contains "ing"',
      placeholder: 'e.g. Running',
      options: {
        validate: ((value: string | string[]) => {
          if (value.indexOf('ing') < 0) {
            return 'That input does not contain "ing"';
          }
        })
      }
    },
    // multiline input
    {
      type: 'multiline',
      name: 'story',
      label: 'Tell us your story',
      placeholder: 'This is a "multiline" input type',
      helpText: 'If you need some inspiration, read this help text'
    },
    // media input
    {
      type: 'media',
      name: 'hero',
      label: 'Upload a hero image',
      previewType: 'hero',
      HelpText: () => <div>Need ideas? Browse <a href="https://unslpash.com">unslpash</a> for rights free not-ugly images.</div>,
      options: {
        validate: ((value) => {
          if (value && value.size > 10_000_000) {
            return 'Files must be smaller than 10mb';
          }
          return value;
        })
      }
    },
    // media input, thumb type
    {
      type: 'media',
      name: 'thumbnail',
      label: 'Upload a thumbnail preview',
      previewType: 'thumb',
    },
    // select (radix)
    {
      type: 'select',
      name: 'shipping',
      label: 'Select shipping',
      placeholder: 'Select an option...',
      helpText: 'Ground deliveries can take up to several millennia.',
      choices: [
        '---UPS',
        { label: 'UPS Ground', value: 'ups-ground-234' },
        { label: 'UPS Same Day', value: 'ups-sd-234', disabled: true },
        'UPS Air',
        '---Fedex',
        'FedEx Ground',
        'FedEx Air',
        '---Erie Canal',
        { label: 'Barge +Mule Power', value: 'boat-w-sal' },
        'Barge Only'
      ],
      options: {
        required: 'Select a valid shipping option to proceed with order',
      },
      observe: true
    },

    // radio group (radix)
    {
      type: 'radio',
      name: 'dinner-choice',
      label: 'Dinner choice',
      helpText: 'Note, the vegetarian option is vegan.',
      choices: [
        { label: 'Chicken', value: 'chicken' },
        { label: 'Fish', value: 'fish' },
        { label: 'Filet Mignon w Gold Leaf', value: 'filet-mignon', disabled: true },
        'Vegetarian'
      ]
    },
    // switch (radix)
    {
      type: 'switch',
      name: 'auto-reply',
      label: 'Vacation mode (auto-reply to messages)',
    },
    {
      type: 'switch',
      name: 'data-enabled',
      label: 'Enable cellular data roaming',
      helpText: 'Switches are cool 😎, but data roaming is usually not.'
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