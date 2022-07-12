<script setup>
import { useStore } from '@/stores/pins';

const store = useStore();

// Local state
const email = ref('');
const password = ref('');

const userLogin = () => {
  return store.userLogin({
    email: email.value,
    password: password.value,
  });
};

definePageMeta({
  title: 'Login | Instapins',
  meta: [
    {
      hid: 'description',
      name: 'description',
      content: 'Login to your account',
    },
  ],
});
</script>

<template>
  <main class="mx-auto max-w-[768px] px-4 py-10">
    <!-- Login Form -->
    <h1 class="mb-4 text-3xl text-primary">Login</h1>
    <form
      class="flex flex-col gap-6 rounded-2xl bg-white p-12 shadow-pinterest md:flex-row"
      @submit.prevent="userLogin"
    >
      <figure class="w-full">
        <img class="mx-auto h-full w-full" src="@/assets/login.svg" alt="login image" />
      </figure>
      <div class="w-full">
        <section class="mb-2 flex flex-col">
          <label for="email" class="mb-1 text-sm text-gray-500">Email</label>
          <input
            id="email"
            v-model="email"
            type="email"
            class="rounded-md border border-gray-500 p-2 text-gray-500 focus:outline-primary"
            required
          />
        </section>

        <section class="mb-2 flex flex-col">
          <label for="password" class="mb-1 text-sm text-gray-500">Password</label>
          <input
            id="password"
            v-model="password"
            type="password"
            class="rounded-md border border-gray-500 p-2 text-gray-500 focus:outline-primary"
            required
          />
        </section>

        <input
          type="submit"
          value="Login"
          class="my-6 mx-auto block cursor-pointer self-center rounded-sm border-2 border-solid border-transparent bg-primary py-2 px-6 text-sm text-white duration-200 hover:border-primary hover:bg-primary focus:outline-primary"
        />

        <nuxt-link class="mx-auto mt-6 block w-full text-center text-sm" to="/register">
          Don't have an account? <span class="text-green-500">Register</span>
        </nuxt-link>
      </div>
    </form>
  </main>
</template>
