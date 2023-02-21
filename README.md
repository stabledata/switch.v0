# Radix Declarative Form

Renders form elements with controlled components connected via redux-hook-form based on a single configuration.

## Basic Usage

Install:

```
npm i radix-declarative-form
```

In any React component:

```
import { useRDF, RDF } from 'radix-declarative-form';
import 'radix-declarative-form/rdf.css';

function MyComponent() {
  const fields = [
    {
      name: 'hello',
      type: 'text,
      label: 'A simple, required field',
      placeholder: 'Write something here',
      options: {
        required: 'This field is required.',
      },
    }
  ]
  const form = useRdf(fields, async function (formData, formState){
    console.log(formData)
      // => FormData ready for multipart submit
    console.log(formState)
      // => plain object (see typescript example below)
  });

  return (<RDF form={form} />;
}
```

## Using With Typescript

With typescript, you can create a type around your form data and pass to RDF via generics.

```
import { useRDF, RDF } from 'radix-declarative-form';
import type { RDFField } from 'radix-declarative-form';
import 'radix-declarative-form/rdf.css';

type Person = {
  firstName: string
  lastName: string
  employmentStatus: string
}

const fields: RDFField<Person>[] = [
  {
      name: 'firstName',
      type: 'text,
      label: 'First Name',
      options: {
        required: 'This field is required.',
      },
    },
    {
      name: 'lastName',
      type: 'text,
      label: 'Last Name',
      options: {
        required: 'This field is required.',
      },
    },
    {
      name: 'employmentStatus',
      type: 'select,
      label: 'Last Name',
      choices: [
        'Full time', 'part time', 'unemployed'
      ],
      default: 'Full time'
    },
];

function MyComponent() {
  const form = useRdf(fields, async function (formData: FormData, formState: Person){
    console.log(formData)
      // => FormData ready for multipart submit
    console.log(formState)
      // => object of Person type
  });

  return (<RDF<Person> form={form} />;
}
```

## Currently Supported Types:

  * text
  * multiline
  * number
  * checkbox
  * select
  * radio
  * switch
  * media
  * list (BETA)
  * table (BETA)

## CSS Variables and Defaults

```css

--button-color-light: #222;
  --button-color-hover-light: #666;
  --button-text-light: #fff;
  --button-color-dark: #eee;
  --button-color-hover-dark: #fff;
  --button-text-dark: #222;

  --label-color-light: #555;
  --label-color-dark: #fff;

  --input-text-color-light: #333;
  --input-text-color-dark: #fff;
  --input-background-light: #fff;
  --input-background-dark: #333;
  --input-border-light: #888;
  --input-border-dark: #444;
  --input-focused-shadow-light: #888;
  --input-focused-shadow-dark: #999;
  --input-border-error-light: #ff7070;
  --input-border-error-dark: #ff7070;

  --checkbox-background-light: #fff;
  --checkbox-background-dark: #111;
  --checkbox-border-light: #888;
  --checkbox-border-dark: #bbb;
  --checkbox-check-light: #000;
  --checkbox-check-dark: #fff;

  --switch-on-background-light: rgb(55, 199, 55);
  --switch-on-background-dark: rgb(55, 199, 55);
  --switch-off-background-light: rgb(148, 148, 148);
  --switch-off-background-dark: rgb(125, 125, 125);

  --radio-select-indicator-light: #555;
  --radio-select-indicator-dark: #bbb;

  --select-placeholder-color-light: #777;
  --select-placeholder-color-dark: #777;
  --select-group-label-light: rgb(158, 158, 158);
  --select-group-label-dark: #aaa;
  --select-highlight-text-light: #222;
  --select-highlight-background-light: rgb(228, 228, 228);
  --select-highlight-text-dark: rgb(241, 241, 241);
  --select-highlight-background-dark: rgb(89, 89, 89);

  --select-item-disabled-light: #ddd;
  --select-item-disabled-dark: #555;

  --select-content-shadow-light: rgba(22, 23, 24, 0.35);
  --select-content-shadow-dark: rgba(190, 190, 190, 0.35);

  --media-target-background-light: #eee;
  --media-target-background-dark: rgb(86, 86, 86);
  --media-target-icon-color-light: rgb(207, 207, 207);
  --media-target-icon-color-dark: rgb(144, 144, 144);

  --link-color:  rgb(72, 202, 238);
  --error-message: #cc0000;

  ```