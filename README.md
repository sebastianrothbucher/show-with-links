# show-with-links

Vue3 component to recognize links in a text and show them as links *without* using unsafe HTML.

## Usage

```
npm i show-with-links --save
```

then w/in a Vue component

```javascript
<script setup>
import { ShowWithLinks } from 'show-with-links'
</script>
<template>
  <div> Some content
    <show-with-links :plain="myPlainTextVar" target="_blank"></show-with-links>
  </div>
</template>
```

Parameters: 

- plain - plain text that will be transformed to text with links
- targt (optional) - target of the generated links

So far, it detects http:// and https://

Hint: you can preserve line breaks by CSS via `white-space: pre-wrap;`
