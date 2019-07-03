# app-header



<!-- Auto Generated Below -->


## Properties

| Property     | Attribute     | Description | Type      | Default     |
| ------------ | ------------- | ----------- | --------- | ----------- |
| `backButtom` | `back-buttom` |             | `boolean` | `undefined` |
| `ionTitle`   | `ion-title`   |             | `string`  | `undefined` |


## Dependencies

### Used by

 - [app-step1](../app-step1)
 - [app-step2](../app-step2)

### Depends on

- ion-header
- ion-toolbar
- ion-buttons
- ion-back-button
- ion-title

### Graph
```mermaid
graph TD;
  app-header --> ion-header
  app-header --> ion-toolbar
  app-header --> ion-buttons
  app-header --> ion-back-button
  app-header --> ion-title
  ion-back-button --> ion-icon
  ion-back-button --> ion-ripple-effect
  app-step1 --> app-header
  app-step2 --> app-header
  style app-header fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
