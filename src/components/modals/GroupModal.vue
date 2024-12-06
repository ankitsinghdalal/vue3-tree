<script  setup lang="ts">
import { ref, watch, onMounted } from "vue"
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { useTreeStore } from '@/stores/tree';

const treeStore = useTreeStore();
const { addChild, editNode, getNodeAtPath } = treeStore;

// Props
const props = defineProps({
  show: Boolean,
  name: String,
});

// Emit events
const emit = defineEmits<{
  (event: "close"): void;
}>();

// Group data
const group = ref({ name: '' });

// Validation rules
const rules = {
  name: { required },
};

const v$ = useVuelidate(rules, group);

watch(
  () => props.show,
  (isShown) => {
    if (isShown && props.name !== "add-child") {
      const parentNode = getNodeAtPath(treeStore.activeNode);
      if (parentNode) {
        // Optionally set group data
        group.value.name = parentNode.name || "";
      }
    }
  }
);

// Handle adding the group
const handleSubmit = () => {
  v$.value.$validate(); // Trigger validation
  if (v$.value.$invalid) return; // Stop if validation fails

  if(props.name === 'add-child') {
    const child = { id: Date.now(), name: group.value.name, children: [] };
    addChild(treeStore.activeNode, child);
  } else {
    const grpupName =  group.value.name;
    editNode(treeStore.activeNode, grpupName);
  }
  
  resetForm();
  emit("close");
};

// Handle closing the popup
const handleClose = () => {
  resetForm();
  emit("close");
};

// Reset form and validation state
const resetForm = () => {
  group.value = { name: "" };
  v$.value.$reset();
};
</script>

<template>
  <div v-if="show" class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
    <div class="bg-white p-6 rounded shadow-lg w-1/2">
      <h2 class="text-lg font-bold mb-4">
        <span v-if="props.name === 'add-child'">Add New Group</span>
        <span v-else>Edit Group</span>
        {{treeStore.activeNode}}
      </h2>
      <div class="max-w mx-auto">
        <!-- Name Field -->
        <div class="mb-6 relative">
          <label for="name" class="block text-sm font-medium text-gray-900">Group Name</label>
          <input type="text" id="name" v-model="group.name" :class="{ 'border-red-500': v$.name.$error, 'border-gray-300': !v$.name.$error }"
            class="bg-gray-50 border text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2.5"
            placeholder="Enter group name" />
          <span v-if="v$.name.$error" class="text-red-500 text-sm absolute">
            {{ v$.name.$errors.map((error) => error.$message).join(' | ') }}
          </span>
        </div>
      </div>
      <div class="space-x-5">
        <button @click="handleSubmit" class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none rounded-full text-md px-5 py-2.5 font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed">
          <span v-if="props.name === 'add-child'">Add</span>
          <span v-else>Edit</span>
        </button>
        <button @click="handleClose"
          class="text-gray-600 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 rounded-full text-md px-5 py-2.5 font-semibold disabled:bg-gray-200 disabled:cursor-not-allowed">Cancel</button>
      </div>
    </div>
  </div>
</template>