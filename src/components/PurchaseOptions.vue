<script setup>
import { ref } from "vue";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast/use-toast";
import Toaster from "@/components/ui/toast/Toaster.vue";

const emits = defineEmits(["popMenu", "plan"]);
const { toast } = useToast();

const close = () => {
  console.log;
  emits("popMenu", false);
};

const subscribe = (plan) => {
  if (plan === "standard") {
    toast({
      title: "Success",
      description: `Subscribed to ${plan} plan`,
    });
    emits("plan", 10);
  } else if (plan === "pro") {
    toast({
      title: "Success",
      description: `Subscribed to ${plan} plan`,
    });
    emits("plan", 10000);
  }
  console.log(`Subscribed to ${plan} plan`);
};
</script>

<style scoped></style>

<template>
  <Toaster />
  <div
    class="fixed inset-0 z-20 flex items-center justify-center bg-[#1e1e2e]/50 backdrop-blur-sm"
  >
    <div class="grid gap-6 rounded-lg bg-[#313244] p-6 text-[#cdd6f4]">
      <div class="flex items-center justify-between">
        <h2 class="text-2xl font-bold">Purchase Options</h2>
        <Button
          class="rounded-full bg-[#45475a] text-[#cdd6f4] hover:bg-[#585b70] hover:text-[#f5e0dc]"
          @click="close"
          aria-label="Close"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon icon-tabler icon-tabler-x h-5 w-5 text-[#cdd6f4]"
            width="44"
            height="44"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="#cdd6f4"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M18 6l-12 12" />
            <path d="M6 6l12 12" />
          </svg>
        </Button>
      </div>
      <div class="grid gap-4">
        <div class="grid gap-2">
          <span class="text-sm font-medium">Standard Plan</span>
          <div class="flex items-center justify-between">
            <span>10 generations per month</span>
            <span class="font-bold">$9.99/mo</span>
          </div>
          <Button
            class="bg-[#7c3aed] text-[#f5e0dc] hover:bg-[#9e6df6] hover:text-[#f5e0dc]"
            @click="subscribe('standard')"
          >
            Subscribe
          </Button>
        </div>
        <div class="grid gap-2">
          <span class="text-sm font-medium">Pro Plan</span>
          <div class="flex items-center justify-between">
            <span>Unlimited generations</span>
            <span class="font-bold">$19.99/mo</span>
          </div>
          <Button
            class="bg-[#7c3aed] text-[#f5e0dc] hover:bg-[#9e6df6] hover:text-[#f5e0dc]"
            @click="subscribe('pro')"
          >
            Subscribe
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>
