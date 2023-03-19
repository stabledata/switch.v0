---
title: 'Select Field - RDF Documentation'
---

# Checkbox

The `select` type is a controlled component provided by [radix-ui](https://www.radix-ui.com/docs/primitives/components/select). Using the `choices` property, you can pass a single array of values, array of `{ value, label, disabled? }`

```js
// note, this is an element in the fields array (see getting started)
{
  type: 'select',
  name: 'shipping',
  label: 'Select shipping',
  placeholder: 'Select an option...',
  helpText: 'Ground deliveries can take up to several millennia.',
  default: 'FedEx Ground',
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
}
// ... rest of the fields array

```

## Demo

##### select


## Properties

The following documents the full list of properties that alter a text field's behavior.

| Property   | Type | Description |
|--|--|--|
| name       | String | The form data/state object property name. |
| label      | String | The label for the form field. This is typically displayed next to the field to describe what it is for. |
| default    | String | The default value for the form field. This is used to pre-populate the field with a value when the form is first loaded.                                                                                                                                                          |
| choices    | RDFChoiceOption[] | An array of string or `{ value: string, label: string, disabled?: boolean }                                                                                                                                             |
| helpText   | String | Additional text that can be displayed below the form field to provide additional information or instructions for the user.                                                                                                                                                                                                                      |
| HelpText   | ReactElement | To render markup, tooltips and other more advanced help options, a component can be returned from this property.                                                                                                                                                                                              |
| observe    | Boolean | Determines if the field will be included in stateful updates that can be passed both during validation and changes to form state. *See advanced topics for more detail*                                                                                                                                                                                     |
| disabled   | Boolean | Determines whether the form field should be disabled. Values and any state prior to being disabled is preserved.                                                                                                                                                                                   |
| hidden     | Boolean | Determines whether the form field should be hidden. Note, that this is done with CSS. The markup will still be rendered as to avoid unnecessary re-renders and destruction of controlled input state.                                                                                                                    |
| options    | RegisterOptions  | Object you would pass if you were using [react-hook-form](https://react-hook-form.com/api/useform/register) directly. RDF calls register automatically and passes this configuration as the second argument.

