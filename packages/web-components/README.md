# NP WebComponents

This package includes a set of native WebComponents to aid front-end development. The components have no dependencies or build steps, simply import/include the files in your project and you're ready to go!

## Installation

Add the following entries to your `.npmrc` file:

```
@northprim:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken={YOUR_GITHUB_TOKEN}
```

Ensure that your token has the "Package read" permission.

Then, simply use: `npm install @northprim/web-components` to install the package.

## Usage

Import the package in a top level file, for example:

```typescript
// main.ts

import '@northprim/web-components';
```

Then, simply use the custom elements in your codebase:

```html
<np-tabs>
    <np-tab name="home" slot="tabs">Home</np-tab>
    <np-tab name="profile" slot="tabs">Profile</np-tab>
    <np-tab-panel name="home" slot="panels">
        <!-- Your Home Page content -->
    </np-tab-panel>
    <np-tab-panel name="profile" slot="panels">
        <!-- Your Profile Page content -->
    </np-tab-panel>
</np-tabs>
```

## TODO

- Add a changelog for future releases.
- Add full custom-elements.json generation which all necessary fields/props/attrs/etc.
- Add per-component documentation showing APIs, basic and advanced usage.
- Ensure compatibility with all major frameworks (Vue, Angular, React, etc.).
- Improve build process/workflow (e.g. only publish on `package.json` version change).
- Revisit `/dist` directory and `package.json > exports` structure in order to ensure tree-shaking and granular imports.