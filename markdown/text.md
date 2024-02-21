---
title: 'Text Field - RDF Documentation'
---

### Form Field Types
# Text Field

The `text` type field has the basic options you would expect. `number`, `email` and `password` may also be passed as type which will render the semantic HTML input type attribute accordingly.

```js
// this is an element in the fields array (see getting started)
{
  type: 'text', // specifies this should render as a text field
  name: 'fullName',
  placeholder: 'Enter your name',
  helpText: 'Your full name is required so that we know who you are.',
  label: 'Your Full Name',
  options: {
    required: 'This field is required.',
  },
}
// ... rest of the fields array

```

## Demo

##### text
## Properties

The following documents the full list of properties that alter a text field's behavior.

| Property   | Type | Description |
|--|--|--|
| name       | String | The form data/state object property name. |
| label      | String | The label for the form field. This is typically displayed next to the field to describe what it is for. |
| placeholder | String | The placeholder text to display in the form field when it is empty.                                                                                                                                                                                                                                                                         |
| default    | String | The default value for the form field. This is used to pre-populate the field with a value when the form is first loaded.                                                                                                                                                          |
| helpText   | String | Additional text that can be displayed below the form field to provide additional information or instructions for the user.                                                                                                                                                                                                                      |
| HelpText   | ReactElement | To render markup, tooltips and other more advanced help options, a component can be returned from this property.                                                                                                                                                                                              |
| observe    | Boolean | Determines if the field will be included in stateful updates that can be passed both during validation and changes to form state. *See advanced topics for more detail*                                                                                                                                                                                     |
| disabled   | Boolean | Determines whether the form field should be disabled. Values and any state prior to being disabled is preserved.                                                                                                                                                                                   |
| hidden     | Boolean | Determines whether the form field should be hidden. Note, that this is done with CSS. The markup will still be rendered as to avoid unnecessary re-renders and destruction of controlled input state.                                                                                                                    |
| options    | RegisterOptions  | Object you would pass if you were using [react-hook-form](https://react-hook-form.com/api/useform/register) directly. RDF calls register automatically and passes this configuration as the second argument.
