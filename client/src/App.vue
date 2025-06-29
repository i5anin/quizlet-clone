<!-- App.vue -->
<template>
  <n-config-provider :theme="naiveTheme">
    <div style="max-width: 600px; margin: 40px auto">
      <router-view />
    </div>
  </n-config-provider>
</template>

<script setup>
import { naiveTheme } from '@/app/theme'
</script>
