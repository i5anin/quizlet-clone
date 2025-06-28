<template>
  <n-card title="Вопрос из Telegram" size="medium" segmented class="poll-card">
    <section v-if="current">
      <n-thing :title="current.poll.question" class="question-block">
        <n-list bordered>
          <n-list-item
              v-for="(answer, i) in current.poll.answers"
              :key="i"
              clickable
              :class="getAnswerClass(i)"
              @click="selectAnswer(i)"
          >
            <n-space align="center" class="answer-item">
              <n-text strong class="answer-index">{{ i + 1 }}.</n-text>
              <n-text class="answer-text">{{ answer.text }}</n-text>
            </n-space>
          </n-list-item>
        </n-list>

        <n-divider v-if="selectedAnswerIndex !== null" />

        <n-space v-if="selectedAnswerIndex !== null" vertical size="small">
          <n-text v-if="current.poll.explanation">
            <strong>Объяснение:</strong> {{ current.poll.explanation }}
          </n-text>

          <n-grid :cols="3" responsive="screen">
            <n-gi><n-text depth="3">ID: {{ current.id }}</n-text></n-gi>
            <n-gi><n-text depth="3">Дата: {{ formatDate(current.date) }}</n-text></n-gi>
            <n-gi><n-text depth="3">Голосов: {{ current.poll.total_voters }}</n-text></n-gi>
          </n-grid>
        </n-space>

        <n-divider />

        <n-space justify="space-between">
          <n-button @click="prev" :disabled="index === 0" type="default">← Назад</n-button>
          <n-button @click="next" :disabled="index === items.length - 1" type="primary">Вперёд →</n-button>
        </n-space>
      </n-thing>
    </section>

    <n-result
        v-else
        status="404"
        title="Вопрос не найден"
        description="Проверьте ID в URL"
    />
  </n-card>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import restored_data from '../../../server/restored_data.json'

interface PollAnswer {
  text: string
  correct?: boolean
}

interface Poll {
  question: string
  total_voters: number
  answers: PollAnswer[]
  explanation?: string
}

interface Message {
  id: number
  date: string
  poll: Poll
}

// роутинг
const route = useRoute()
const router = useRouter()

// id из параметров маршрута
const paramId = route.params.id ? Number(route.params.id) : null

// список карточек с опросами
const items = ref<Message[]>(restored_data.messages.filter((m: any) => m.poll))

// вычисляем начальный индекс по id, если есть
const index = ref(0)
if (paramId !== null) {
  const idx = items.value.findIndex(m => m.id === paramId)
  if (idx !== -1) index.value = idx
}

// текущая карточка
const current = computed(() => items.value[index.value] || null)
const selectedAnswerIndex = ref<number | null>(null)

function next() {
  if (index.value < items.value.length - 1) {
    index.value++
    selectedAnswerIndex.value = null
    router.replace({ name: 'card-by-id', params: { id: current.value.id } })
  }
}

function prev() {
  if (index.value > 0) {
    index.value--
    selectedAnswerIndex.value = null
    router.replace({ name: 'card-by-id', params: { id: current.value.id } })
  }
}

function selectAnswer(i: number) {
  if (selectedAnswerIndex.value === null) {
    selectedAnswerIndex.value = i
  }
}

function getAnswerClass(i: number): string {
  if (selectedAnswerIndex.value === null) return ''
  const answer = current.value?.poll.answers[i]
  if (!answer) return ''
  if (answer.correct) return 'correct'
  if (selectedAnswerIndex.value === i) return 'incorrect'
  return ''
}

function formatDate(raw: string): string {
  return new Date(raw).toLocaleString('ru-RU', {
    dateStyle: 'short',
    timeStyle: 'short'
  })
}
</script>

<style scoped>
.answer-item {
  display: flex;
  gap: 8px;
  align-items: center;
}
.answer-index {
  min-width: 1.5em;
  text-align: right;
}
.n-list-item.correct {
  border-left: 4px solid #52c41a;
}
.n-list-item.incorrect {
  border-left: 4px solid #ff4d4f;
}
.n-list-item:hover {
  cursor: pointer;
}
</style>
