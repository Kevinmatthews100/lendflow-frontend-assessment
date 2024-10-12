<script setup lang="ts">
import { onMounted, ref, useTemplateRef } from 'vue'
import Card from './Card.vue'

const cards = Array.from(Array(100), (_, x) => `Card ${x + 1}`)

// Add code to this file to complete the task
const cardRefs = useTemplateRef('card-ref')
const focusedCardId = ref(0)

onMounted(() => {
  const cardSpanElements = cardRefs.value?.map((card, id) =>
    card?.$el.querySelector(`#card-${id}-text`)
  )

  if (!cardSpanElements) {
    throw new Error('Unable to find span elements within cards!')
  }

  /**
   * @description An array of ids of cards that are *currently* within the viewport.
   * Note that my implementation does expect that this array is ordered, the id that
   * most recently entered the viewport should be pushed to the *end* of the array.
   */
  const intersectingCardIds: number[] = []

  const onCardTextEntersOrExitsViewport = (entries: IntersectionObserverEntry[]) => {
    for (const entry of entries) {
      const cardId = Number(entry.target.id.split('-')[1])

      if (entry.isIntersecting) {
        intersectingCardIds.push(cardId)
      }

      if (!entry.isIntersecting) {
        const indexToRemove = intersectingCardIds.indexOf(cardId)

        if (indexToRemove === -1) {
          continue
        }

        intersectingCardIds.splice(indexToRemove, 1)
      }
    }

    // We can know which direction the user is scrolling based on the order of the last 2 elements
    // in the `intersectingCardIds` array.
    const lastElement = intersectingCardIds[intersectingCardIds.length - 1]
    const secondLastElement = intersectingCardIds[intersectingCardIds.length - 2]

    // User is scrolling down
    if (secondLastElement < lastElement) {
      intersectingCardIds.sort((a, b) => a - b)
    }

    // User is scrolling up
    if (secondLastElement > lastElement) {
      intersectingCardIds.sort((a, b) => b - a)
    }

    focusedCardId.value = intersectingCardIds[0]
  }

  const intersectionObserver = new IntersectionObserver(onCardTextEntersOrExitsViewport, {
    root: null,
    rootMargin: '8px',
    threshold: 1.0
  })

  for (const cardSpanElement of cardSpanElements) {
    intersectionObserver.observe(cardSpanElement)
  }
})
</script>

<template>
  <div>
    <Card
      v-for="(card, id) in cards"
      ref="card-ref"
      :cardText="card"
      :isInFocus="focusedCardId === id"
      :key="id"
    >
      <p>
        <span :id="`card-${id}-text`">{{ card }}</span>
      </p>
    </Card>
  </div>
</template>

<style scoped></style>
