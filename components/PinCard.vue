<script setup>
import HeartOutline from 'icons/HeartOutline.vue';
import DeleteEmpty from 'icons/DeleteEmpty.vue';
import LeadPencil from 'icons/LeadPencil.vue';

const props = defineProps({
  pin: {
    type: Object,
  },
});

// Local state
const liked = ref(false);
const user = useSupabaseUser();

onMounted(() => {
  if (user) {
    if (props.pin.likes) {
      if (
        pin.likes.find((like) => {
          return like.username === user.username;
        })
      ) {
        const { username } = this.pin.likes.find((like) => {
          return like.username === user.username;
        });

        if (username === user.username) {
          liked.value = true;
        }
      }
    }
  }
});

const like = () => {
  // console.log(this.pin)
  liked.value = !liked.value;

  if (liked.value) {
    return;
    // this.$store.dispatch('pins/likePin', this.pin);
    // setTimeout(() => {
    //   this.$store.dispatch('pins/fetchPins');
    // }, 100);
    // return;
  }

  // await this.$store.dispatch('pins/unlikePin', this.pin);
  // setTimeout(() => {
  //   this.$store.dispatch('pins/fetchPins');
  // }, 100);
};

const deletePin = () => {
  // this.$store.dispatch('pins/deletePin', this.pin.id);
  return;

  // setTimeout(() => {
  //   this.$store.dispatch('pins/fetchPins')
  // }, 100)
};
</script>

<template>
  <div
    class="group relative block max-w-sm cursor-zoom-in break-inside-avoid overflow-hidden rounded-2xl shadow-xl"
  >
    <nuxt-link :to="`/${props.pin.id}`" class="cursor-zoom-in">
      <img
        class="w-full transition-all duration-300 group-hover:scale-110 group-hover:brightness-50"
        :src="pin.url"
      />
    </nuxt-link>

    <p class="absolute bottom-2 left-2 hidden self-end text-white group-hover:block">
      {{ props.pin.title }}
    </p>

    <div v-if="user" class="absolute top-2 right-2 hidden self-start group-hover:block">
      <button
        v-if="user.username === props.pin.owner && $route.path === '/profile'"
        class="rounded-lg p-1 text-white transition-all duration-300 hover:bg-primary"
      >
        <nuxt-link :to="`/${pin.id}/edit/`">
          <LeadPencil :size="32" />
        </nuxt-link>
      </button>
      <button
        v-if="user.username === props.pin.owner && $route.path === '/profile'"
        class="rounded-lg p-1 text-white transition-all duration-300 hover:bg-red-500"
      >
        <DeleteEmpty :size="32" @click="deletePin" />
      </button>
    </div>

    <button
      v-if="$route.path !== '/profile'"
      class="absolute top-2 right-2 hidden self-start rounded-lg p-1 transition-all duration-300 hover:text-white group-hover:block"
    >
      <HeartOutline
        :size="48"
        :fill-color="liked ? 'red' : 'gray'"
        class="text-white"
        :class="user ? 'cursor-pointer' : 'cursor-not-allowed'"
        :title="user ? 'Like' : 'You must be logged in to like pins'"
        @click="user ? like() : null"
      />
    </button>
  </div>
</template>
