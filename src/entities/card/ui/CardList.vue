<template>
  <n-card title="Карточки" size="medium" segmented>
    <n-form @submit.prevent="handleSubmit">
      <n-form-item label="Вопрос">
        <n-input v-model:value="front" placeholder="Введите вопрос" />
      </n-form-item>
      <n-form-item label="Ответ">
        <n-input v-model:value="back" placeholder="Введите ответ" />
      </n-form-item>
      <n-form-item>
        <n-button type="primary" attr-type="submit">Добавить</n-button>
      </n-form-item>
    </n-form>

    <n-divider>Список</n-divider>

    <n-card
        v-for="card in cards"
        :key="card.id"
        :title="card.front"
        size="small"
        class="mb-2"
        segmented
    >
      <n-thing :description="card.back" />
      <n-button
          type="error"
          size="small"
          @click="removeCard(card.id)"
          style="margin-top: 8px"
      >
        Удалить
      </n-button>
    </n-card>

    <n-divider>Всего: {{ total }}</n-divider>
  </n-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useCards } from '../model/useCards'

const front = ref('')
const back = ref('')

const { cards, addCard, removeCard, total } = useCards()

const handleSubmit = () => {
  const frontText = front.value.trim()
  const backText = back.value.trim()

  if (!frontText || !backText) return

  addCard(frontText, backText)
  front.value = ''
  back.value = ''
}
</script>

<style scoped>
.mb-2 {
  margin-bottom: 12px;
}
</style>
