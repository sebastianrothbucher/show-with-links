<script setup lang="ts">
import { computed, defineProps, Ref } from 'vue'

const props = defineProps<{
  plain: string,
  target?: string,
}>();

const parts: Ref<{text: string, isLink?: boolean}[]> = computed(() => {
  let remainder = props.plain;
  let res: {text: string, isLink?: boolean}[] = [];
  while (remainder?.length) {
    const nextLinkHttp = remainder.indexOf('http://');
    const nextLinkHttps = remainder.indexOf('https://');
    let nextLinkIndex = -1;
    if (nextLinkHttp >= 0 && nextLinkHttps >= 0) {
      nextLinkIndex = Math.min(nextLinkHttp, nextLinkHttps);
    } else if (nextLinkHttp >= 0) {
      nextLinkIndex = nextLinkHttp;
    } else if (nextLinkHttps >= 0) {
      nextLinkIndex = nextLinkHttps;
    }
    if (nextLinkIndex >= 0) {
      if (nextLinkIndex > 0) {
        res.push({text: remainder.substring(0, nextLinkIndex)});
      }
      const nextSpaceIndex = remainder.indexOf(' ', nextLinkIndex + 4);
      if (nextSpaceIndex >= 0) {
        res.push({text: remainder.substring(nextLinkIndex, nextSpaceIndex), isLink: true});
        remainder = remainder.substring(nextSpaceIndex);
      } else {
        res.push({text: remainder.substring(nextLinkIndex), isLink: true});
        remainder = '';
      }
    } else {
      res.push({text: remainder});
      remainder = '';
    }
  }
  return res;
});

</script>

<template>
  <span class="text-with-links">
    <template v-for="(p, i) in parts" :key="i">
      <a v-if="p.isLink" :href="p.text" :target="target">{{p.text}}</a>
      <template v-else>{{p.text}}</template>
    </template>
  </span>
</template>