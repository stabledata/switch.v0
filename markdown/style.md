### Customizing Styles


# It's just CSS.

RDF makes customizations painless as possible. No long class attributes and no inline CSS rendered in JS to override. Grayscale light and dark mode defaults scale each element to 100% of the form container width for out of the box responsiveness and a11y.

# Wrap and Go.

Styles in RDF are also "flat", so a namespaced wrapper is all you need without worrying about order or using `!important`.

For example, to make the toggle switch color blue (it is green by default), you could simply wrap the RDF component with `<div className="demo">...</div>` and style it like this:

```css
.demo .switch {
  background-color: skyblue;
  -webkit-tap-highlight-color: skyblue;
}
```

## Color Variables

Any of the following variables can be defined in your custom CSS which will change the colors of the elements:

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




