<script setup>
import { ref } from "vue";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/toast/use-toast";
import Toaster from "@/components/ui/toast/Toaster.vue";
import { useRouter } from "vue-router";

const { toast } = useToast();

const emailR = ref("");
const usernameR = ref("");
const passwordR = ref("");
const emailL = ref("");
const passwordL = ref("");
const router = useRouter();

const register = () => {
  if (emailR.value !== "" && usernameR.value !== "" && passwordR.value !== "") {
    localStorage.setItem("email", emailR.value);
    localStorage.setItem("username", usernameR.value);
    localStorage.setItem("password", passwordR.value);
    localStorage.setItem("generations", 15);
    localStorage.setItem("logged", false);
    console.log("User registered successfully!");
    toast({
      title: "Success",
      description: "User registered successfully!",
    });
    setTimeout(() => {
      router.go("/");
    }, 2000);
  } else {
    toast({
      title: "Error",
      description: "Fill in all fields!",
    });
  }
};

const login = () => {
  if (emailL.value !== "" && passwordL.value !== "") {
    console.log(localStorage.getItem("email"))
    console.log(localStorage.getItem("password"))
    if (
      emailL.value === localStorage.getItem("email") &&
      passwordL.value === localStorage.getItem("password")
    ) {
      localStorage.setItem("logged", true);
      toast({
        title: "Success",
        description: "User logged successfully!",
      });
      setTimeout(() => {
        router.go("/");
      }, 2000);
    } else {
      toast({
        title: "Error",
        description: "Email or Password is incorrect!",
      });
    }
  } else {
    toast({
      title: "Error",
      description: "Fill in all fields!",
    });
  }
};
</script>

<style scoped></style>

<template>
  <Toaster />
  <div
    class="fixed inset-0 z-20 flex items-center justify-center bg-[#1e1e2e]/50 backdrop-blur-sm"
  >
    <Tabs default-value="account" class="w-[400px] ">
      <TabsList class="grid w-full grid-cols-2 bg-[#313244] text-[#cdd6f4]">
        <TabsTrigger value="account"> Account </TabsTrigger>
        <TabsTrigger value="register"> Register </TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Card class="bg-[#313244] text-[#cdd6f4]">
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>
              You must enter your account to use the tool.
            </CardDescription>
          </CardHeader>
          <CardContent class="space-y-2">
            <div class="space-y-1">
              <Label class="text-sm font-medium text-[#cdd6f4]" for="email">Email</Label>
              <Input class="bg-[#313244] text-[#cdd6f4] placeholder:text-[#a6adc8]" v-model="emailL" id="email" type="email" placeholder="email@email.com" />
            </div>
            <div class="space-y-1">
              <Label class="text-sm font-medium text-[#cdd6f4]" for="password">Password</Label>
              <Input class="bg-[#313244] text-[#cdd6f4] placeholder:text-[#a6adc8]" v-model="passwordL" id="password" type="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button @click="login" class="bg-[#7c3aed] text-[#f5e0dc] hover:bg-[#9e6df6] hover:text-[#f5e0dc]">Login</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent  value="register">
        <Card class="bg-[#313244] text-[#cdd6f4]">
          <CardHeader >
            <CardTitle>Register</CardTitle>
            <CardDescription>
              You must register to use the tool.
            </CardDescription>
          </CardHeader>
          <CardContent class="space-y-2">
            <div class="space-y-1">
              <Label class="text-sm font-medium text-[#cdd6f4]" for="userName">Username</Label>
              <Input class="bg-[#313244] text-[#cdd6f4] placeholder:text-[#a6adc8]" v-model="usernameR" id="userName" type="text" />
            </div>
            <div class="space-y-1">
              <Label class="text-sm font-medium text-[#cdd6f4]" for="email">Email</Label>
              <Input class="bg-[#313244] text-[#cdd6f4] placeholder:text-[#a6adc8]" v-model="emailR" id="email" type="email" />
            </div>
            <div class="space-y-1">
              <Label class="text-sm font-medium text-[#cdd6f4]" for="password">password</Label>
              <Input class="bg-[#313244] text-[#cdd6f4] placeholder:text-[#a6adc8]" v-model="passwordR" id="password" type="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button @click="register" class="bg-[#7c3aed] text-[#f5e0dc] hover:bg-[#9e6df6] hover:text-[#f5e0dc]">Register</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  </div>
</template>
