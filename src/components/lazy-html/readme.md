# lazy-html

## Component to make lazy HTML content calls. Request is done after component is scrolled into viewport

## Usage
```html
    <lazy-html
        url="https://jsonplaceholder.typicode.com/users/1">
    </lazy-html>
```


<!-- Auto Generated Below -->


## Properties

| Property      | Attribute     | Description                                                                                                                                                                                        | Type     | Default     |
| ------------- | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ----------- |
| `margin`      | `margin`      | Determines how far from the viewport lazy loading starts. Can have values similar to the CSS margin property, e.g. "10px 20px 30px 40px" (top, right, bottom, left). The values can be percentages | `string` | `undefined` |
| `placeholder` | `placeholder` | Request url                                                                                                                                                                                        | `string` | `''`        |
| `url`         | `url`         | Request url                                                                                                                                                                                        | `string` | `undefined` |


## Events

| Event      | Description                                                      | Type                |
| ---------- | ---------------------------------------------------------------- | ------------------- |
| `error`    | Thrown as a failed request callback. Carries response object     | `CustomEvent<void>` |
| `resolved` | Thrown as a succesfull request callback. Carries response object | `CustomEvent<void>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
