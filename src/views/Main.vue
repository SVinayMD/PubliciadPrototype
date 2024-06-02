<script setup>
  import { ref, computed } from "vue";
  import { useRouter, useRoute } from "vue-router";
  import { Separator } from "@/components/ui/separator";
  import { Button } from "@/components/ui/button";
  import { Input } from "@/components/ui/input";
  import { Textarea } from '@/components/ui/textarea'
  import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
  } from "@/components/ui/select";
  import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuItem,
  } from "@/components/ui/dropdown-menu";
  import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip";
  import PurchaseOptions from "@/components/PurchaseOptions.vue";
  import Footer from "@/components/Footer.vue";
  import { generateImage as fetchImage } from "@/api/api";
  import { useToast } from "@/components/ui/toast/use-toast";
  import Toaster from "@/components/ui/toast/Toaster.vue";
  import LoginRegister from "@/components/Login&Register.vue";

  const maxPromptLength = 50;

  const { toast } = useToast();

  const username = localStorage.getItem("username")

  const popMenuPlan = ref({
    message: "",
    generations: 0
  })

  const generations = ref(localStorage.getItem("generations"));
  const imageSize = ref("");
  const selectedImageSize = ref("");
  const imageStyle = ref("");
  const selectedImageStyle = ref("");
  const prompt = ref("");
  const negativePrompt = ref("");
  const seed = ref(-1);
  const imageRef = ref(null);
  const generatedImage = ref("");
  const router = useRouter();
  const finallyResponse = ref(false);

  const openMenu = ref(false);

  const openMenuSubscribe = () => {
    openMenu.value = true;
  };

  const isLoggedIn = ref(localStorage.getItem("logged"));

  const handleShow = (info) => {
    console.log(info)
    openMenu.value = info;  
    console.log(openMenu.value)
  };

  const handlePlan = (info) => {
    generations.value = parseInt(generations.value) + parseInt(info);
    localStorage.setItem("generations", generations.value);
  };

  const selectImageSize = (size) => {
    imageSize.value = size;
    selectedImageSize.value = size;
  };

  const selectImageStyle = (style) => {
    imageStyle.value = style;
    selectedImageStyle.value = style;
  };
  const openImageInNewWindow = () => {
    const imageUrl = generatedImage.value;
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = 'generated_image.png';
    link.click();
  };

  const promptLength = computed(() => prompt.value.length);
  const negativePromptLength = computed(() => negativePrompt.value.length);

  const generateImage = async () => {
    finallyResponse.value = false
    if (generations.value == 0) {
      openMenuSubscribe();
    } else {
      if (
        imageSize.value !== "" &&
        imageStyle.value !== "" &&
        prompt.value !== ""
      ) {

        const [width, height] = imageSize.value.split("x");
        const data = {
          prompt: prompt.value,
          negative_prompt: negativePrompt.value,
          seed: seed.value,
          sampler_name: "Restart",
          steps: 30,
          cfg_scale: 7,
          width: parseInt(width),
          height: parseInt(height),
          send_images: true
        };

        try {
          const response = await fetchImage(data);
          const base64Image = response.images;
          generatedImage.value = `data:image/png;base64,${base64Image}`; 
          imageRef.value.src = generatedImage.value;
          generations.value -= 1;
          localStorage.setItem("generations", generations.value);
        } catch (error) {
          toast({
            title: "Error",
            description: "Error generating image:" + error,
          });
          console.error("Error generating image:", error);
        }finally{
          finallyResponse.value = true
        }
      } else {
        toast({
          title: "Error",
          description: "You must fill in all fields",
        });
      }
    }
  };

  const copyPromptToClipboard = (value) => {
    navigator.clipboard
      .writeText(value)
      .then(() => {
        toast({
          title: "Done",
          description: value + " copied to clipboard!",
        });
        console.log("Prompt copied to clipboard!");
      })
      .catch((err) => {
        toast({
          title: "Error",
          description: "Could not copy prompt: " + err,
        });
        console.error("Could not copy prompt: ", err);
      });
  };


  const logout = () => {
    localStorage.setItem("logged", false);
    toast({
      title: "Success",
      description: "You have successfully logged out of your account!",
    });
    setTimeout(() => {
      router.go("/");
    }, 2000);
  }

  const support = () => {
    toast({
      title: "Support?",
      description: "Support ni que mondá caradeverga, maricón, cara conejo",
    });
  }
</script> 

<template>
  <Toaster />
  <LoginRegister v-if="isLoggedIn === 'false' || isLoggedIn === null"/>
  <div class="flex flex-col min-h-screen">
    <div class="grid min-h-screen w-full grid-cols-1 lg:grid-cols-[280px_1fr]">
      <div class="hidden border-r bg-[#1e1e2e] dark:bg-[#1e1e2e] lg:block">
        <div class="flex h-full max-h-screen flex-col gap-4 p-4">
          <div class="flex h-[60px] items-center border-b px-4">
            <router-link
              to="#"
              class="flex items-center gap-2 font-semibold text-[#cdd6f4]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon icon-tabler icon-tabler-badge-ad h-6 w-6 text-[#cdd6f4]"
                width="44"
                height="44"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="#ffffff"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path
                  d="M3 5m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z"
                />
                <path d="M14 9v6h1a2 2 0 0 0 2 -2v-2a2 2 0 0 0 -2 -2h-1z" />
                <path d="M7 15v-4.5a1.5 1.5 0 0 1 3 0v4.5" />
                <path d="M7 13h3" />
              </svg>

              <span>PublicIAd</span>
            </router-link>
          </div>
          <div class="grid gap-4 px-2">
            <div class="grid gap-1">
              <h3 class="text-sm font-medium text-[#cdd6f4]">Image Size</h3>
              <div class="grid grid-cols-3 gap-2">
                <Button
                  :class="{
                    'bg-[#45475a] text-[#f5e0dc]':
                      selectedImageSize === '832x1216',
                    'bg-[#313244] text-[#cdd6f4] hover:bg-[#45475a] hover:text-[#f5e0dc]':
                      selectedImageSize !== '832x1216',
                  }"
                  @click="selectImageSize('832x1216')"
                  size="sm"
                  variant="outline"
                >
                  832x1216
                </Button>
                <Button
                  :class="{
                    'bg-[#45475a] text-[#f5e0dc]':
                      selectedImageSize === '1216x832',
                    'bg-[#313244] text-[#cdd6f4] hover:bg-[#45475a] hover:text-[#f5e0dc]':
                      selectedImageSize !== '1216x832',
                  }"
                  @click="selectImageSize('1216x832')"
                  size="sm"
                  variant="outline"
                >
                  1216x832
                </Button>
                <Button
                  :class="{
                    'bg-[#45475a] text-[#f5e0dc]':
                      selectedImageSize === '1024x1024',
                    'bg-[#313244] text-[#cdd6f4] hover:bg-[#45475a] hover:text-[#f5e0dc]':
                      selectedImageSize !== '1024x1024',
                  }"
                  @click="selectImageSize('1024x1024')"
                  size="sm"
                  variant="outline"
                >
                  1024x1024
                </Button>
              </div>
            </div>
            <div class="grid gap-1">
              <h3 class="text-sm font-medium text-[#cdd6f4]">Image Style</h3>
              <div class="grid grid-cols-3 gap-2">
                <Button
                  :class="{
                    'bg-[#45475a] text-[#f5e0dc]':
                      selectedImageStyle === 'Logotype',
                    'bg-[#313244] text-[#cdd6f4] hover:bg-[#45475a] hover:text-[#f5e0dc]':
                      selectedImageStyle !== 'Logotype',
                  }"
                  @click="selectImageStyle('Logotype')"
                  size="sm"
                  variant="outline"
                >
                  Logotype
                </Button>
                <Button
                  :class="{
                    'bg-[#45475a] text-[#f5e0dc]':
                      selectedImageStyle === 'Realistic',
                    'bg-[#313244] text-[#cdd6f4] hover:bg-[#45475a] hover:text-[#f5e0dc]':
                      selectedImageStyle !== 'Realistic',
                  }"
                  @click="selectImageStyle('Realistic')"
                  size="sm"
                  variant="outline"
                >
                  Realistic
                </Button>
                <Button
                  :class="{
                    'bg-[#45475a] text-[#f5e0dc]':
                      selectedImageStyle === 'Cartoon',
                    'bg-[#313244] text-[#cdd6f4] hover:bg-[#45475a] hover:text-[#f5e0dc]':
                      selectedImageStyle !== 'Cartoon',
                  }"
                  @click="selectImageStyle('Cartoon')"
                  size="sm"
                  variant="outline"
                >
                  Cartoon
                </Button>
              </div>
            </div>
            <div class="grid gap-1">
              <h3 class="text-sm font-medium text-[#cdd6f4]">Prompt</h3>
              <Textarea
                class="w-full bg-[#313244] text-[#cdd6f4] placeholder:text-[#a6adc8]"
                v-model="prompt"
                :maxlength="maxPromptLength"
                placeholder="Enter your prompt..."
                type="text"
              />
              <div class="text-sm text-[#cdd6f4] text-right">
                {{ promptLength }} / {{ maxPromptLength }} characters
              </div>
            </div>
            <div class="grid gap-1">
              <h3 class="text-sm font-medium text-[#cdd6f4]">
                Negative Prompt
              </h3>
              <Textarea
                class="w-full bg-[#313244] text-[#cdd6f4] placeholder:text-[#a6adc8]"
                v-model="negativePrompt"
                :maxlength="maxPromptLength"
                placeholder="Enter your Negative prompt..."
                type="text"
              />
              <div class="text-sm text-[#cdd6f4] text-right">
                {{ negativePromptLength }} / {{ maxPromptLength }} characters
              </div>
            </div>
            <div class="grid gap-1">
              <h3 class="text-sm font-medium text-[#cdd6f4]">Seed</h3>
              <Input
                class="w-full bg-[#313244] text-[#cdd6f4] placeholder:text-[#a6adc8]"
                v-model="seed"
                placeholder="Enter a seed value..."
                type="number"
              />
            </div>
            <Button
              @click="generateImage"
              class="w-full bg-[#7c3aed] text-[#f5e0dc] hover:bg-[#9e6df6] hover:text-[#f5e0dc]"
              variant="primary"
            >
              Generate Image
            </Button>
          </div>
        </div>
      </div>
      <div class="flex flex-col">
        <header
          class="flex h-14 items-center border-b bg-[#1e1e2e] px-6 dark:bg-[#1e1e2e] lg:h-[60px]"
        >
          <router-link to="#" class="lg:hidden text-[#cdd6f4]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-photo h-6 w-6 text-[#cdd6f4]"
              width="44"
              height="44"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="#ffffff"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M15 8h.01" />
              <path
                d="M3 6a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v12a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3v-12z"
              />
              <path d="M3 16l5 -5c.928 -.893 2.072 -.893 3 0l5 5" />
              <path d="M14 14l1 -1c.928 -.893 2.072 -.893 3 0l3 3" />
            </svg>

            <span class="sr-only">AI Image Generator</span>
          </router-link>
          <div class="flex-1 flex items-center gap-4 justify-end">
            <div class="flex items-center gap-2">
              <Button
                @click="openMenuSubscribe"
                class="rounded-full bg-[#313244] text-[#cdd6f4] hover:bg-[#45475a] hover:text-[#f5e0dc]"
                size="icon"
                variant="ghost"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="icon icon-tabler icon-tabler-square-rounded-plus h-5 w-5 text-[#cdd6f4]"
                  width="44"
                  height="44"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="#ffffff"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path
                    d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z"
                  />
                  <path d="M15 12h-6" />
                  <path d="M12 9v6" />
                </svg>

                <span class="sr-only">Add generation</span>
              </Button>
              <span class="text-sm font-medium text-[#cdd6f4]"
                >Generations: {{ generations }}</span
              >
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  class="rounded-full bg-[#313244] text-[#cdd6f4] hover:bg-[#45475a] hover:text-[#f5e0dc]"
                  size="icon"
                  variant="ghost"
                >
                  <img
                    alt="Avatar"
                    class="rounded-full"
                    height="32"
                    src="../assets/img/placeholder.svg"
                    style="aspect-ratio: 32/32; object-fit: cover"
                    width="32"
                  />
                  <span class="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                class="bg-[#313244] text-[#cdd6f4]"
              >
                <DropdownMenuLabel class="text-[#cdd6f4]"
                  >My Account</DropdownMenuLabel
                >
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  class="hover:bg-[#45475a] hover:text-[#f5e0dc]"
                  >{{ username }}</DropdownMenuItem
                >
                <DropdownMenuItem
                @click="support"
                  class="hover:bg-[#45475a] hover:text-[#f5e0dc]"
                  >Support</DropdownMenuItem
                >
                <DropdownMenuSeparator />
                <DropdownMenuItem
                @click="logout"
                  class="hover:bg-[#45475a] hover:text-[#f5e0dc]"
                  >Logout</DropdownMenuItem
                >
              </DropdownMenuContent>
            </DropdownMenu>
            <PurchaseOptions @popMenu="handleShow" @plan="handlePlan" v-if="openMenu" />
          </div>
        </header>
        <main class="flex-1 bg-[#1e1e2e] p-4 md:p-6">
          <div class="mx-auto grid max-w-2xl gap-6">
            <div class="grid gap-2">
              <h1
                class="text-3xl font-bold tracking-tighter text-[#cdd6f4] sm:text-4xl md:text-5xl animate-pulse text-center"
              >
                AD generator with AI
              </h1>
            </div>
            <div class="grid gap-4">
              <div
                class="relative aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-[#7c3aed] to-[#9e6df6] p-1"
              >
                <div
                  v-if="!finallyResponse"
                  class="absolute inset-0 z-10 grid place-items-center bg-[#1e1e2e]/50 backdrop-blur-sm"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="icon icon-tabler icon-tabler-loader h-10 w-10 animate-spin text-[#f5e0dc]"
                    width="44"
                    height="44"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="#ffffff"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M12 6l0 -3" />
                    <path d="M16.25 7.75l2.15 -2.15" />
                    <path d="M18 12l3 0" />
                    <path d="M16.25 16.25l2.15 2.15" />
                    <path d="M12 18l0 3" />
                    <path d="M7.75 16.25l-2.15 2.15" />
                    <path d="M6 12l-3 0" />
                    <path d="M7.75 7.75l-2.15 -2.15" />
                  </svg>
                </div>

                <img
                  v-if="!finallyResponse"
                  ref="imageRef"
                  alt="Generated Image"
                  class="aspect-square w-full object-cover"
                  height="512"
                  src="https://via.placeholder.com/300"
                  width="512"
                />
                <img
                  v-else="finallyResponse"
                  ref="imageRef"
                  alt="Generated Image"
                  class="aspect-square w-full object-cover rounded-xl"
                  height="512"
                  :src="generatedImage"
                  width="512"
                />
              </div>
              <div v-if="finallyResponse" class="grid gap-2">
                <div class="flex items-center justify-between">
                  <span class="text-sm font-medium text-[#cdd6f4]">
                    Prompt: {{ prompt }}
                  </span>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Button
                          @click="copyPromptToClipboard(prompt)"
                          class="text-[#cdd6f4] hover:bg-[#45475a] hover:text-[#f5e0dc]"
                          size="icon"
                          variant="ghost"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="icon icon-tabler icon-tabler-copy h-5 w-5 text-[#cdd6f4]"
                            width="44"
                            height="44"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="#ffffff"
                            fill="none"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path
                              d="M7 7m0 2.667a2.667 2.667 0 0 1 2.667 -2.667h8.666a2.667 2.667 0 0 1 2.667 2.667v8.666a2.667 2.667 0 0 1 -2.667 2.667h-8.666a2.667 2.667 0 0 1 -2.667 -2.667z"
                            />
                            <path
                              d="M4.012 16.737a2.005 2.005 0 0 1 -1.012 -1.737v-10c0 -1.1 .9 -2 2 -2h10c.75 0 1.158 .385 1.5 1"
                            />
                          </svg>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <span class="">Copy prompt</span>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-sm font-medium text-[#cdd6f4]"
                    >Seed: {{ seed }}</span
                  >
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Button
                          @click="copyPromptToClipboard(seed)"
                          class="text-[#cdd6f4] hover:bg-[#45475a] hover:text-[#f5e0dc]"
                          size="icon"
                          variant="ghost"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="icon icon-tabler icon-tabler-copy h-5 w-5 text-[#cdd6f4]"
                            width="44"
                            height="44"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="#ffffff"
                            fill="none"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path
                              d="M7 7m0 2.667a2.667 2.667 0 0 1 2.667 -2.667h8.666a2.667 2.667 0 0 1 2.667 2.667v8.666a2.667 2.667 0 0 1 -2.667 2.667h-8.666a2.667 2.667 0 0 1 -2.667 -2.667z"
                            />
                            <path
                              d="M4.012 16.737a2.005 2.005 0 0 1 -1.012 -1.737v-10c0 -1.1 .9 -2 2 -2h10c.75 0 1.158 .385 1.5 1"
                            />
                          </svg>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <span class="">Copy seed</span>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
              <div v-if="finallyResponse" class="flex justify-end gap-2">
                <Button
                  @click="openImageInNewWindow"
                  class="bg-[#313244] text-[#cdd6f4] hover:bg-[#45475a] hover:text-[#f5e0dc]"
                  variant="outline"
                >
                  Download
                </Button>
                <Button
                  @click="generateImage"
                  class="bg-[#7c3aed] text-[#f5e0dc] hover:bg-[#9e6df6] hover:text-[#f5e0dc]"
                  variant="primary"
                >
                  Generate New
                </Button>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
