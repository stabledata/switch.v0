---
title: 'Media Upload - RDF Documentation'
---

### Form Field Types

# Media

The `media` type is a controlled component which provides image upload and preview functionality.

Support for non-image file types is coming soon.

```js
// note, this is an element in the fields array (see getting started)
{
  type: 'media',
  name: 'image',
  label: 'Upload a banner',
  helpText: 'Please keep files below 30mb', // not a real config option, yet
  previewType: 'hero', // can be 'thumb' or 'hero' for full width upload
  options: {
    required: 'You simply must upload an image!'
  }
},
// ... rest of the fields array

```

## Demo

##### media


## Properties

The following documents the full list of properties that alter the field's behavior.

| Property   | Type | Description |
|--|--|--|
| name       | String | The form data/state object property name. |
| label      | String | The label for the form field. This is typically displayed next to the field to describe what it is for. |
| previewType    | 'hero' &#124; 'thumbnail' | The preview style to use for the image uploader.                                                                                                                                                          |
| helpText   | String | Additional text that can be displayed below the form field to provide additional information or instructions for the user.                                                                                                                                                                                                                      |
| HelpText   | ReactElement | To render markup, tooltips and other more advanced help options, a component can be returned from this property.                                                                                                                                                                                              |
| observe    | Boolean | Determines if the field will be included in stateful updates that can be passed both during validation and changes to form state. *See advanced topics for more detail*                                                                                                                                                                                     |
| disabled   | Boolean | Determines whether the form field should be disabled. Values and any state prior to being disabled is preserved.                                                                                                                                                                                   |
| hidden     | Boolean | Determines whether the form field should be hidden. Note, that this is done with CSS. The markup will still be rendered as to avoid unnecessary re-renders and destruction of controlled input state.                                                                                                                    |
| options    | RegisterOptions  | Object you would pass if you were using [react-hook-form](https://react-hook-form.com/api/useform/register) directly. RDF calls register automatically and passes this configuration as the second argument.

