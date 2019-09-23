# Contributing

There are two primary ways to contribute to this project. You can [request a new component](https://github.com/codewithkyle/custom-components-website/issues/new) through GitHub issues or you can write your own component/category and submit a pull request.

## Adding a Category

To create new category run the following command in your terminal:

```sh
npm run create
```

Then select the **Category** option from the list.

## Adding a Web Component

To create new web component run the following command in your terminal:

```sh
npm run create
```

Then select the **Component** option from the list. Enter a short but descriptive name for you new component before selecting what category the component should be generated in. If the component doesn't seem to fit into any of the listed categories terminate the generator and create the new category first.

Navigate into the `src/` directory and locate your new component. You'll notice that some default files will be generated for you, feel free to change them or remove them depending on your components needs.

If you need custom HTML, CSS, or JavaScript that will only appear in the demo viewer and now in the source code feel free to add the following files to the components directory:

- `demo.scss`
- `demo.html`
- `demo.ts`

If these files are available when the compiler runs they will be injected into the compiled files.

## Scripts

Run the following commands to compile the project:

```sh
# Compiles the code
npm run compile

# Compiles the code and starts a HTTP server
npm run build

# Starts a HTTP server
npm run preview
```
