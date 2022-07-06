<script setup>
import Magnify from 'icons/Magnify.vue';

// Local state
const searchValue = useState('');

const onSearch = (e) => {
  searchValue.value = e.target.value;
  this.$emit('search', e.target.value);
};
</script>

<template>
  <div class="relative flex h-12 items-center">
    <Magnify class="absolute mx-2" fill-color="gray" />
    <input
      class="h-10 rounded-lg border border-gray-400 bg-transparent py-6 pl-8 pr-4 placeholder:pl-2 focus:outline-none focus:ring-1 focus:ring-gray-500"
      :class="searchValue ? 'focus:ring-1 focus:ring-primary' : ''"
      type="text"
      placeholder="Search by title"
      @input="onSearch"
    />
  </div>
</template>
