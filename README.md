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

  *  text
  *  multiline
  *  number
  *  checkbox
  *  select
  *  radio
  *  switch
  *  media