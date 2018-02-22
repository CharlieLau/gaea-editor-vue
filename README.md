# gaea-editor-vue

## demo
>  [demo](https://charlielau.github.io/gaea-editor-vue)

## Installation

Install with yarn:

```sh
$ yarn  add   gaea-editor-vue
# or with npm:
$ npm install gaea-editor-vue
```

## Usage:

Main.js:

```javascript
//依赖vuex
import store from './store/index';
import GaeaEditor from 'gaea-editor-vue';

Vue.use(GaeaEditor, {store});

```

component.vue:

```vue
<template>
  <div id="app">
     <gaea-editor style="height:600px" />
  </div>
</template>
<script>
</script>

<style>
</style>
```
## Refrence

>  [gaea-editor](https://github.com/ascoders/gaea-editor)
