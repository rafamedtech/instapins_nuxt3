<script setup>
import ImageOffOutline from 'icons/ImageOffOutline.vue';
import TrayArrowUp from 'icons/TrayArrowUp.vue';
import CloseCircle from 'icons/CloseCircle.vue';
import ArrowLeft from 'icons/ArrowLeft.vue';
import { useStore } from '@/stores/pins';

const store = useStore();
const user = useSupabaseUser();

// Local state
const pin = reactive({
  title: '',
  description: '',
  url: '',
});

const isLoading = ref(false);
const modalMsg = ref('');
const uploadedImage = ref(null);

//   computed: {
//     request() {
//       return this.$store.getters.getRequest;
//     },

const createPin = () => {
  console.log({
    title: pin.title,
    description: pin.description,
    url: pin.url,
    owner: user.value.id,
  });

  // if (uploadedImage) {
  //   formData.append('url', uploadedImage);
  // } else {
  //   formData.append('url', pin.image.value);
  // }

  store.createPin({
    title: pin.title,
    description: pin.description,
    url: pin.url,
    owner: user.value.id,
  });
};

const onUpload = (e) => {
  if (uploadedImage) {
    deleteUploadedImage();
  }
  const file = e.target.files[0];
  modalMsg.value = 'Uploading image...';
  isLoading.value = true;

  setTimeout(() => {
    isLoading.value = false;
  }, 3000);

  setTimeout(() => {
    store.uploadImage({
      filename: `${Date.now()}-${file.name}`,
      file,
    });
  }, 2000);
};

// const deleteUploadedImage = () => {
//   const url = uploadedImage.replace(
//     'https://kkacmmdynlmnvnvjismq.supabase.co/storage/v1/object/public/test-bucket/',
//     ''
//   );

//   modalMsg.value = 'Deleting image...';
//   isLoading.value = true;

//   setTimeout(() => {
//     if (request.status !== 'error') {
//       isLoading.value = false;
//     }
//   }, 3000);

//   setTimeout(() => {
//     this.$store.dispatch('pins/deleteUpload', {
//       filename: url,
//     });
//   }, 2500);
// };
</script>

<template>
  <main class="container">
    <button class="mx-4 mb-6 flex gap-x-2 text-gray-500" @click="$router.go(-1)">
      <ArrowLeft fill-color="#5481bb" /> Back
    </button>
    <section
      class="mx-2 flex h-auto min-h-[500px] flex-col rounded-[32px] p-4 shadow-pinterest md:mx-4 md:flex-row md:gap-x-8"
    >
      <article
        class="absolute inset-0 z-50 grid h-screen w-screen place-items-center overflow-hidden bg-[#2C394B]/75 transition-all"
        :class="{ hidden: !isLoading }"
      >
        <transition name="fade">
          <Modal v-if="isLoading" :message="modalMsg" />
        </transition>
      </article>
      <article
        class="mx-auto w-full items-center justify-center rounded-xl md:my-10 md:w-[400px] md:py-0"
      >
        <figure
          v-if="uploadedImage || pin.url"
          class="h-full w-full overflow-hidden rounded-xl py-4"
        >
          <img v-if="uploadedImage" :src="uploadedImage" alt="" class="h-auto w-full rounded-xl" />
          <img v-else :src="pin.url" alt="" class="h-auto w-full rounded-xl" />
        </figure>
        <div
          v-else
          class="flex h-full w-full flex-col items-center justify-center gap-y-4 rounded-xl border-2 border-dashed border-primary bg-[#F6F8FB] py-4"
        >
          <ImageOffOutline :size="48" fill-color="gray" />
          <p class="text-gray-600">No preview available</p>
        </div>
      </article>

      <!-- New entry form -->
      <form class="mx-auto flex w-full flex-col gap-y-8 py-4 md:w-1/2" @submit.prevent="createPin">
        <input
          v-model="pin.title"
          type="text"
          placeholder="Add a title"
          class="border-b-2 text-4xl text-gray-500 focus:outline-none"
          required
        />
        <textarea
          v-model="pin.description"
          placeholder="Tell us about your pin"
          class="h-40 w-full rounded-[16px] border border-gray-400 p-4 text-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500"
          required
        ></textarea>
        <div class="flex items-center gap-4">
          <div v-if="uploadedImage" class="relative w-full">
            <CloseCircle
              class="absolute -right-2 -top-2 cursor-pointer"
              fill-color="red"
              title="Delete image"
              @click="deleteUploadedImage"
            />
            <input
              type="text"
              class="w-full rounded-[16px] border border-gray-400 p-4 text-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500"
              :value="uploadedImage"
              readonly
            />
          </div>
          <input
            v-else
            v-model="pin.url"
            type="text"
            placeholder="Add your image url or upload a new one"
            class="w-full rounded-[16px] border border-gray-400 p-4 text-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500"
            required
          />

          <label
            for="upload"
            class="grid cursor-pointer place-items-center rounded-xl bg-gray-500 p-2 text-xs text-gray-100 hover:opacity-75"
            ><TrayArrowUp /> Upload</label
          >
          <input id="upload" type="file" class="hidden" @change="onUpload" />
        </div>
        <div class="flex w-full items-center justify-end gap-x-4">
          <button class="text-gray-500 hover:text-red-500" @click="$router.go(-1)">Cancel</button>
          <input
            type="submit"
            value="Create pin"
            class="cursor-pointer rounded-lg bg-primary px-3 py-3 text-white shadow-md hover:bg-primary/75"
          />
        </div>
      </form>
    </section>
  </main>
</template>
