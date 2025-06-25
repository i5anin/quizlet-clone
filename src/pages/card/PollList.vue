<template>
  <section v-if="current" class="poll-viewer">
    <h2 class="question">{{ current.poll.question }}</h2>

    <ul class="answers">
      <li v-for="(answer, i) in current.poll.answers" :key="i">
        {{ answer.text }}
      </li>
    </ul>

    <footer class="meta">
      <span>ID: {{ current.id }}</span>
      <span>Дата: {{ formatDate(current.date) }}</span>
      <span>Голосов: {{ current.poll.total_voters }}</span>
    </footer>

    <div class="controls">
      <button @click="prev" :disabled="index === 0">← Назад</button>
      <button @click="next" :disabled="index === items.length - 1">Вперёд →</button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import restored_data from '../../../server/restored_data.json'

interface PollAnswer {
  text: string
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


<style scoped>
.poll-viewer {
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 1.2rem;
  max-width: 600px;
  margin: 2rem auto;
  background: #fdfdfd;
}

.question {
  font-size: 1.2rem;
  margin-bottom: 0.8rem;
}

.answers {
  padding-left: 1.2rem;
  list-style: disc;
  margin-bottom: 1rem;
}

.meta {
  font-size: 0.85rem;
  color: #666;
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>
