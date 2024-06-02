<template>
  <Layout @keydown="handleKeyDown" tabindex="0">
    <router-view />
  </Layout>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import Layout from "@/components/Layout.vue";

const handleKeyDown = (event) => {
  // Check if Ctrl + K is pressed
  if (event.ctrlKey && event.key === "c") {
    alert("Pe copio esa mondá compae!");
  }
  if (event.ctrlKey && event.key === "v") {
    alert("Pe pegó esa mondá compae!");
  }
};
</script>

<style></style>
