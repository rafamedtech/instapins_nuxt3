<script setup>
import TrayArrowUp from 'icons/TrayArrowUp.vue';
import ArrowLeft from 'icons/ArrowLeft.vue';
import { useStore } from '@/stores/pins';

// export default {
//   components: {
//     UploadIcon: TrayArrowUp,
//     BackIcon: ArrowLeft,
//   },

// middleware: 'auth',

// Local state
const user = useSupabaseUser();
const myPins = useState([]);
const myLikedPins = useState([]);
const isLoading = useState(false);

// computed: {
//   getPins() {
//     return this.$store.getters['pins/getPins'];
//   },
// },

// mounted() {
//   this.checkMyPins();

//   this.myLikedPins = this.$store.getters['pins/getPins'].filter((pin) =>
//     pin.likes.some((like) => like.username === this.$auth.user.username)
//   );
// },

// methods: {
const checkMyPins = async () => {
  await this.$store.dispatch('pins/fetchPins');
  if (
    getPins.filter((pin) => {
      return pin.owner === user.username;
    })
  ) {
    this.myPins = this.getPins.filter((pin) => {
      return pin.owner === user.username;
    });
  }
};

const onUpload = (e) => {
  const file = e.target.files[0];
  modalMsg.value = 'Uploading image...';
  isLoading.value = true;

  setTimeout(() => {
    isLoading.value = false;
  }, 3000);

  setTimeout(() => {
    this.$store.dispatch('uploadAvatar', {
      filename: `avatars/${Date.now()}-${user.username}-${file.name}`,
      file,
    });
  }, 1000);
};
// },
// };
</script>

<template>
  <main class="container">
    <button class="mx-4 mb-6 flex gap-x-2 text-gray-500" @click="$router.go(-1)">
      <ArrowLeft fill-color="#5481bb" /> Back
    </button>
    <h1 class="mb-5 ml-4 text-4xl text-primary md:ml-4">My Profile</h1>
    <section
      class="m-4 mb-8 flex max-w-xl flex-col items-center rounded-[32px] p-4 shadow-pinterest md:mx-auto md:flex-row md:justify-evenly"
    >
      <figure class="group relative mt-8 h-52 w-52 rounded-full bg-gray-200 md:my-8 md:h-auto">
        <!-- <img
          :src="
            $auth.user.avatar
              ? $auth.user.avatar
              : require('@/assets/user-default.png')
          "
          :alt="$auth.user.username"
          class="z-10 mx-auto h-full w-full rounded-full object-cover md:h-52 md:w-52"
        /> -->
        <div>
          <label
            for="avatar"
            class="absolute inset-0 -z-10 mx-auto hidden h-52 w-52 cursor-pointer flex-col items-center justify-center rounded-full bg-[#2C394B]/75 text-center text-white group-hover:z-50 group-hover:flex"
          >
            <input id="avatar" type="file" class="hidden" @change="onUpload" />
            <TrayArrowUp fill-color="white" />
            <span>Update avatar</span>
          </label>
        </div>
      </figure>
      <i class="mb-8 mt-4 text-sm text-gray-500 md:hidden">Tap the image to change it</i>

      <!-- Upload avatar modal -->
      <article
        class="absolute inset-0 z-50 grid h-screen w-screen place-items-center overflow-hidden bg-[#2C394B]/75 transition-all"
        :class="{ hidden: !isLoading }"
      >
        <transition name="fade">
          <Modal v-if="isLoading" :message="modalMsg" />
        </transition>
      </article>

      <article
        class="mb-8 flex h-full w-full flex-col justify-center gap-y-4 text-center md:w-fit md:gap-y-8 md:text-left"
      >
        <div>
          <i class="text-primary">Username</i>
          <!-- <p class="text-3xl text-gray-500 md:text-4xl">
            {{ $auth.user.username }}
          </p> -->
        </div>
        <div>
          <i class="text-primary">Email</i>
          <!-- <p class="text-gray-500 md:text-xl">{{ $auth.user.email }}</p> -->
        </div>
        <div>
          <!-- <p class="text-gray-500 md:text-xl">
            (<span class="text-primary">{{ myPins.length }}</span
            >) Pins
          </p> -->
        </div>
      </article>
    </section>
    <h2 class="mb-5 ml-2 text-3xl text-primary md:ml-4">My pins</h2>
    <section
      v-if="myPins.length"
      class="container columns-2 gap-2 space-y-2 px-2 pb-28 md:columns-3 md:gap-4 md:space-y-4 md:px-4 lg:columns-4 lg:gap-6 lg:space-y-6 lg:px-4"
    >
      <PinCard v-for="(pin, index) in myPins" :key="index" :pin="pin" />
    </section>
    <h2 class="mb-5 ml-2 text-3xl text-primary md:ml-4">
      My liked pins (<span class="text-gray-500">{{ myLikedPins.length }}</span
      >)
    </h2>
    <section
      v-if="myLikedPins.length"
      class="container columns-2 gap-2 space-y-2 px-2 pb-28 md:columns-3 md:gap-4 md:space-y-4 md:px-4 lg:columns-4 lg:gap-6 lg:space-y-6 lg:px-4"
    >
      <PinCard v-for="(pin, index) in myLikedPins" :key="index" :pin="pin" />
    </section>
  </main>
</template>
