# gaea-editor-vue

## Installation

Install with yarn:

```sh
$ yarn 
# or with npm:
$ npm install
```

## Usage:

Main.js:

```javascript
import Vue from 'vue'
import ElementUI from 'element-ui'
import { VuePlugin } from 'vuera'


import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'

Vue.use(ElementUI)
Vue.use(VuePlugin)

new Vue({
  el: '#app',
  render: h => h(App)
})

```

App.vue:

```vue
<template>
  <div id="app">
     <gaea-editor style="height:600px" />
  </div>
</template>

<script>
import GaeaEditor from 'gaea-editor'
export default {
  components: {
    GaeaEditor
  }
}
</script>

<style>

</style>
```
## Refrence

>  [gaea-editor](https://github.com/ascoders/gaea-editor)
