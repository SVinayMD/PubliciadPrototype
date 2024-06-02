<script setup>

import { Separator } from "@/components/ui/separator";
</script>
<template>
  <footer class="bg-[#1e1e2e] p-4 text-[#cdd6f4] dark:bg-[#1e1e2e]">
    <div
      class="container mx-auto flex flex-col items-center justify-between gap-4 md:flex-row"
    >
      <div class="text-sm">© 2024 AI Image Generator. All rights reserved. By Sebastian & Galvan</div>
      <Separator class="my-4 md:hidden" />
      <nav class="flex items-center gap-4">
        <router-link
          to="#"
          class="text-sm hover:underline hover:underline-offset-4"
        >
          Security
        </router-link>
        <router-link
          to="#"
          class="text-sm hover:underline hover:underline-offset-4"
        >
          Terms of Service
        </router-link>
        <router-link
          to="#"
          class="text-sm hover:underline hover:underline-offset-4"
        >
          Privacy Policy
        </router-link>
        <router-link
          to="#"
          class="text-sm hover:underline hover:underline-offset-4"
        >
          Contact
        </router-link>
      </nav>
    </div>
  </footer>
</template>
