# lazy image component

The lazy image component provides the ability to lazy load responsively sized images when they enter the users view.

The HTML structure is as follows:

```
<lazy-image-component>
    <img data-srcset="sources go here" alt="image description">
</lazy-image-component>
```

If you only have 1 image to display you should first ask yourself, "why am I not providing the user with responsively resized images?". If the answer is that you can't, or you just don't care you can provide the following:

```
<lazy-image-component>
    <img data-srcset="image-source-url.jpg 1w" alt="image description">
</lazy-image-component>
```

Just provide the images source along with the `1w` (1 px) value.

The lazy image component has 3 states:

- unseen
- loading
- loaded

The state is applied to the `<lazy-image-component>` via a custom attribute. You can style the states with the following:

```
lazy-image-component
{
    &[state=unseen]
    {
        ...snip...
    }

    &[state=loading]
    {
        ...snip...
    }

    &[state=loaded]
    {
        ...snip...
    }
}
```
