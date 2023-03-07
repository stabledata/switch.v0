---
title: 'Getting Started - RDF Documentation'
---

# Getting Started With RDF

## Install

```shell
npm i radix-declarative-form
```

## Import CSS

Somewhere in your bundled application, add the CSS import so the default styles are exported

```js
import 'radix-declarative-form/rdf.css';
```


## Create Form Component

Create a standard react component file

```jsx
import React from 'react';

function FavoritesForm () {
  return (
    <div className="favorites-form">
      (form component will go here)
    </div>
  );
}

```

## Add Fields array, RDF Hook and Component

The `fields` array is the structure we use to define our form. It defines all the elements, the schema and behavior of each element.

```jsx
import React from 'react';
import { useRDF, RDF } from 'radix-declarative-form';
import 'radix-declarative-form/rdf.css';

function FavoritesForm () {
  const fields = [
    {
      name: 'person',
      type: 'text',
      label: 'Favorite Name',
      options: {
        required: 'This field is required.',
      },
    },
    {
      name: 'primary-color',
      type: 'select',
      label: 'Favorite Primary Color',
      choices: ['red', 'green', 'blue'],
      default: 'red',
    },
  ]

  const onSubmit = async (formData, formState) => {
    // noop for now...
  }
  const form = useRdf(fields, onSubmit);

  return (
    <div className="favorites-form">
      <RDF form={form} />
    </div>
  );
}

```

## Handle Submissions

The example above renders a simple text element and a single choice question element. You
will also notice in one case we are validating the input has been filled out.

`onSubmit(formData, formState): void` is the second argument to `useRDF`.

Here's an example sending a POST using multipart/form-data (FormData) directly.


```jsx
import React from 'react';
import { useRDF, RDF } from 'radix-declarative-form';
import 'radix-declarative-form/rdf.css';
import fields from './fields'; // note: we moved fields to a new file

function FavoritesForm () {
  const onSubmit = async (formData, formState) => {
    formData.add('some-key', 'some-value'); // add a field using FormData methods
    const postRequest = await fetch(
      'https://some-host.com/endpoint',
      {
        method: 'POST',
        // form data is ready as-is, send like it's still 1999.
        body: formData
      }
    );

    // do whatever with results
    const result = await postRequest.json();
  }
  const form = useRdf(fields, onSubmit);

  return (
    <div className="favorites-form">
      <RDF form={form} />
    </div>
  );
}

```

## Get Crazy

More documentation will be created for each type soon.

