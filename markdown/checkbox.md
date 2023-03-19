---
title: 'Checkbox - RDF Documentation'
---

# Checkbox

The `checkbox` type is a controlled component provided by [radix-ui](https://www.radix-ui.com/docs/primitives/components/checkbox).

When a box is **not checked**, the name property will **not be defined** in the state object vs a defined property with value of `false`

```js
// note, this is an element in the fields array (see getting started)
{
  type: 'checkbox',
  name: 'accept-terms', // note, this will not be defined in state when box is not checked
  label: 'I accept the terms of the agreement',
  HelpText: () => (<div>To continue, you must accept the <a href="#">terms</a></div>),
  options: {
    required: 'You must accept the terms!',
  }
}
// ... rest of the fields array

```

## Demo

##### checkbox


## Properties

The following documents the full list of properties that alter a text field's behavior.

| Property   | Type | Description |
|--|--|--|
| name       | String | The form data/state object property name. |
| label      | String | The label for the form field. This is typically displayed next to the field to describe what it is for. |
| default    | String | The default value for the form field. This is used to pre-populate the field with a value when the form is first loaded.                                                                                                                                                          |
| helpText   | String | Additional text that can be displayed below the form field to provide additional information or instructions for the user.                                                                                                                                                                                                                      |
| HelpText   | ReactElement | To render markup, tooltips and other more advanced help options, a component can be returned from this property.                                                                                                                                                                                              |
| observe    | Boolean | Determines if the field will be included in stateful updates that can be passed both during validation and changes to form state. *See advanced topics for more detail*                                                                                                                                                                                     |
| disabled   | Boolean | Determines whether the form field should be disabled. Values and any state prior to being disabled is preserved.                                                                                                                                                                                   |
| hidden     | Boolean | Determines whether the form field should be hidden. Note, that this is done with CSS. The markup will still be rendered as to avoid unnecessary re-renders and destruction of controlled input state.                                                                                                                    |
| options    | RegisterOptions  | Object you would pass if you were using [react-hook-form](https://react-hook-form.com/api/useform/register) directly. RDF calls register automatically and passes this configuration as the second argument.

