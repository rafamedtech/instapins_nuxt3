<script setup>
import ImagePlus from 'icons/ImagePlus.vue';
import Home from 'icons/Home.vue';
import { useStore } from '@/stores/pins';
import { storeToRefs } from 'pinia';

const store = useStore();

// Local state
const openModal = useState(false);
const user = useSupabaseUser();

// User logout
const logoutModal = () => {
  openModal.value = !openModal.value;
};
const { userLogout } = storeToRefs(store);
</script>

<template>
  <header
    class="container mb-6 flex flex-col items-center justify-between gap-y-4 p-4 shadow-nav md:flex-row"
  >
    <nuxt-link :to="{ path: '/' }" class="logo text-5xl text-gray-500">Instapins</nuxt-link>
    <div class="flex flex-col-reverse gap-x-4 gap-y-2 md:flex-row">
      <div class="flex w-[250px] justify-around gap-x-4 md:w-auto">
        <nuxt-link :to="{ path: '/' }" class="relative flex flex-col justify-center">
          <Home :size="36" :fill-color="$route.path === '/' ? '#5481bb' : 'gray'" />
        </nuxt-link>
        <nuxt-link :to="{ path: '/new' }" class="relative flex flex-col justify-center">
          <ImagePlus :size="36" :fill-color="$route.path === '/new' ? '#5481bb' : 'gray'" />
        </nuxt-link>
        <!-- <nuxt-link
          v-if="$auth.loggedIn"
          :to="{ path: '/messages' }"
          class="relative flex flex-col justify-center"
        >


          <Messages
            :size="36"
            :fill-color="$route.path === '/messages' ? '#5481bb' : 'gray'"
          />
        </nuxt-link> -->
        <nuxt-link
          v-if="!user && $route.path !== '/login'"
          :to="{ path: '/login' }"
          class="rounded-lg bg-primary px-3 py-2 text-center text-white shadow-md"
        >
          Login
        </nuxt-link>
        <figure v-if="user" class="group relative h-10 w-10 rounded-full">
          <img
            class="h-full w-full rounded-full object-cover p-1"
            :class="$route.path === '/profile' ? 'bg-primary' : 'bg-gray-200'"
            src="@/assets/user-default.png"
            alt=""
          />
          <div
            class="invisible absolute -bottom-24 -left-28 z-50 m-4 rounded-lg bg-white py-4 px-8 shadow-pinterest transition-all group-hover:visible"
          >
            <ul class="flex flex-col gap-y-4">
              <li>
                <nuxt-link :to="{ path: '/profile' }" class="text-gray-500 hover:text-primary"
                  >Profile</nuxt-link
                >
              </li>
              <button class="text-gray-500 hover:text-primary" @click="logoutModal">Logout</button>
            </ul>
          </div>
        </figure>
      </div>
    </div>
    <article
      class="absolute inset-0 z-50 grid h-screen w-screen place-items-center overflow-hidden bg-[#2C394B]/75 transition-all"
      :class="{ hidden: !openModal }"
    >
      <transition name="fade">
        <Modal
          v-if="openModal"
          confirmation
          message="Are you sure to logout?"
          @onAction="userLogout"
          @closeModal="logoutModal"
        />
      </transition>
    </article>
  </header>
</template>
