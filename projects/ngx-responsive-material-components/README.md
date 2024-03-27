# Responsive Angular Material Components

The purpose of this library is to reduce the amount of boilerplate code needed when using multiple Angular components together. Additionally, provides full responsive behavior through the use of different material components.

## Installation

Run `npm i ngx-responsive-material-components` to install the library.

## Setup

The following modules are available for import into your Angular project(s):

- **ResponsiveMaterialModule**: Includes all other modules, components and directives available in the library
- **TableModule**: Includes only table related components and directives.
- **SearchModule**: Includes only search related components and directives.

```
import { ResponsiveMaterialModule } from 'ngx-responsive-material-components';

@NgModule({
  declarations: [
    ... 
  ],
  imports: [
    ...
    ResponsiveMaterialModule
  ],
  exports: [
    ...
  ]
})
export class YourModule { }
```

## Further help

For questions/requests, please post an issue on the [Github repository](https://github.com/bsuh80111/Angular-Libraries/issues).
