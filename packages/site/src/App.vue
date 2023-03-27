<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/bar">柱状图</RouterLink>
      <RouterLink to="/pie">饼图</RouterLink>
    </nav>
  </header>

  <div style="width: 800px; padding: 0 25%">
    <RouterView />
  </div>
</template>

<style scoped>
header {
  display: flex;
  width: 100%;
  height: 64px;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 1rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}
</style>
