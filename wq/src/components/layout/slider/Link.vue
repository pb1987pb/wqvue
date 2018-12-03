
<template>
  <!-- eslint-disable vue/require-component-is-->
  <component v-bind="linkProps(to)">
    <slot/>
  </component>
</template>

<script>

export default {
  props: {
     //  传递的to是链接
    to: {
      type: String,
      required: true
    }
  },
  methods: {
    isExternalLink(routePath) {
      //监测是否是链接   
  return /^(https?:|mailto:|tel:)/.test(routePath)
    },
    linkProps(url) {
      if (this.isExternalLink(url)) {
        return {
          is: 'a',
          href: url,
          target: '_blank',
          rel: 'noopener'
        }
      }
      return {
        is: 'router-link',
        to: url
      }
    }
  }
}
</script>
