<script setup lang="ts">
import { isDark, toggleTheme } from './theme'
</script>

<template>
  <button
    class="site-theme-toggle"
    type="button"
    :aria-label="isDark ? '切换到亮色模式' : '切换到暗黑模式'"
    :title="isDark ? '切换到亮色模式' : '切换到暗黑模式'"
    :aria-pressed="isDark"
    @click="toggleTheme"
  >
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      stroke-width="1.7"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <template v-if="isDark">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5" />
      </template>
      <path v-else d="M20.5 13A8.5 8.5 0 0 1 11 3.5 8.5 8.5 0 1 0 20.5 13Z" />
    </svg>
  </button>
</template>
