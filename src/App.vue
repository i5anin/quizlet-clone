<!-- App.vue -->
<template>
  <n-config-provider :theme="naiveTheme">
    <div style="max-width: 600px; margin: 40px auto">
      <CardList/>
    </div>
  </n-config-provider>
</template>

<script setup>
import CardList from '@/entities/card/ui/CardList.vue'
import {naiveTheme} from '@/app/theme'
</script>
