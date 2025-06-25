<template>
  <n-card
      title="Вопрос из Telegram"
      size="medium"
      segmented
      class="poll-card"
  >
    <section v-if="current">
      <h2 class="question">{{ current.poll.question }}</h2>

      <n-list bordered class="answers">
        <n-list-item
            v-for="(answer, i) in current.poll.answers"
            :key="i"
        >
          <template #prefix>{{ i + 1 }}.</template>
          <span>{{ answer.text }}</span>
        </n-list-item>
      </n-list>

      <div class="meta">
        <n-space justify="space-between">
          <span>ID: {{ current.id }}</span>
          <span>Дата: {{ formatDate(current.date) }}</span>
          <span>Голосов: {{ current.poll.total_voters }}</span>
        </n-space>
      </div>

      <n-space justify="space-between" class="controls">
        <n-button @click="prev" :disabled="index === 0" type="default">
          ← Назад
        </n-button>
        <n-button @click="next" :disabled="index === items.length - 1" type="primary">
          Вперёд →
        </n-button>
      </n-space>
    </section>
  </n-card>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import restored_data from '../../../server/restored_data.json'

interface PollAnswer {
  text: string
  correct?: boolean
}

interface Poll {
  question: string
  total_voters: number
  answers: PollAnswer[]
}

interface Message {
  id: number
  date: string
  poll: Poll
}

const items = ref<Message[]>(
    restored_data.messages.filter((m: any) => m.poll)
)

const index = ref(0)
const current = computed(() => items.value[index.value] || null)

function next() {
  if (index.value < items.value.length - 1) index.value++
}

function prev() {
  if (index.value > 0) index.value--
}

function formatDate(raw: string): string {
  return new Date(raw).toLocaleString('ru-RU', {
    dateStyle: 'short',
    timeStyle: 'short'
  })
}
</script>

<style>
.n-list .n-list-item .n-list-item__prefix {
  min-width: 1em;
}
</style>