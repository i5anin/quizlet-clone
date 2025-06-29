// useCards.ts
import { ref, computed } from 'vue'
import { initialCards } from './cards.data'

export function useCards() {
    const cards = ref([...initialCards])

    const addCard = (front: string, back: string) => {
        const id = Date.now()
        cards.value.push({ id, front, back })
    }

    const removeCard = (id: number) => {
        cards.value = cards.value.filter(card => card.id !== id)
    }

    const total = computed(() => cards.value.length)

    return {
        cards,
        total,
        addCard,
        removeCard
    }
}
