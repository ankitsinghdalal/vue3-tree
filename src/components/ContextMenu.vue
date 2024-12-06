<script setup lang="ts">

// Emit events
const emit = defineEmits<{
  (event: "add-child"): void;
  (event: "edit-node"): void;
  (event: "delete-node"): void;
}>();
</script>
<template>
  <div class="context-menu absolute -right-32 border border-gray-400 bg-white rounded shadow-lg flex flex-col z-10">
    <button class="px-4 py-2 text-left hover:bg-gray-100" @click="emit('add-child')">Add Child</button>
    <button class="px-4 py-2 text-left hover:bg-gray-100" @click="emit('edit-node')">Edit</button>
    <button class="px-4 py-2 text-left hover:bg-gray-100 text-red-500" @click="emit('delete-node')">Delete</button>
  </div>
</template>