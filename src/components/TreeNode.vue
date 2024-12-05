<script setup lang="ts">
import { ref, defineProps, defineEmits, onMounted, onUnmounted } from 'vue';
import ContextMenu from './ContextMenu.vue';
import TreeNode from './TreeNode.vue';
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faHospital,
  faMedkit,
  faMinus,
  faGripVertical,
  faUserCircle,
  faEllipsisV
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faHospital);
library.add(faMedkit);
library.add(faMinus);
library.add(faGripVertical);
library.add(faUserCircle);
library.add(faEllipsisV);

// Define the type for a single tree node
interface TreeNodeType {
  id: number;
  name: string;
  children: TreeNodeType[];
}

// Props
defineProps<{
  node: TreeNodeType;
  type: String
}>();

// Emit events
const emit = defineEmits<{
  (event: 'add-child', parentId: number, child: TreeNodeType): void;
  (event: 'edit-node', nodeId: number, newName: string): void;
  (event: 'delete-node', nodeId: number): void;
}>();

// State
const showMenu = ref(false);

// Function to toggle menu
const toggleMenu = () => {
  // Close all other menus by dispatching a global event
  const event = new CustomEvent('close-context-menus');
  window.dispatchEvent(event);

  // Toggle the current menu
  showMenu.value = !showMenu.value;
};

// Function to close menu
const closeMenu = () => {
  showMenu.value = false;
};

// Listen for the global close event and clicks outside
onMounted(() => {
  // Close menu on the custom global event
  window.addEventListener('close-context-menus', closeMenu);

  // Close menu when clicking outside
  window.addEventListener('click', handleClickOutside);
});

// Clean up event listeners
onUnmounted(() => {
  window.removeEventListener('close-context-menus', closeMenu);
  window.removeEventListener('click', handleClickOutside);
});

// Function to detect clicks outside
const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  const treeNodeElement = document.querySelector('.tree-node');
  if (treeNodeElement && !treeNodeElement.contains(target)) {
    closeMenu();
  }
};

const onAddChild = (child: TreeNodeType) => {
  emit('add-child', node.id, child);
};

const onEditNode = (newName: string) => {
  emit('edit-node', node.id, newName);
};

const onDeleteNode = () => {
  emit('delete-node', node.id);
};
</script>
<template>
  <div class="relative tree-node space-y-5 left-2">
    <div v-show="node.children.length"
      class="absolute inset-y-3 inset-x-0 top-5 left-16 border-l-2 border-gray-300 border-dotted"></div>
    <div class="w-max relative flex">
      <span class="relative w-14 h-5">
        <span class="absolute top-1/2 w-full h-px -translate-y-1/2 border-t-2 border-gray-300 border-dotted"></span>
      </span>
      <button
        class="w-5 h-5 flex items-center justify-center rounded border border-gray-400 text-sm focus:outline-none">
        <font-awesome-icon icon="minus" class="text-gray-500" />
      </button>
      <span v-if="type === 'child'"><font-awesome-icon icon="grip-vertical" class="text-gray-400 ml-2" /></span>
      <span><font-awesome-icon icon="user-circle" class="text-gray-400 ml-2" /></span>
      <span v-if="type === 'parent'"><font-awesome-icon icon="hospital" class="text-gray-400 ml-2" /></span>
      <span class="text-gray-700 ml-2">{{ node.name }}</span>
      <button class="text-gray-500 hover:text-gray-700 focus:outline-none ml-2" @click="toggleMenu">
        <font-awesome-icon icon="ellipsis-v" class="text-gray-400" />
      </button>
      <ContextMenu v-if="showMenu" @add-child="onAddChild" @edit-node="onEditNode" @delete-node="onDeleteNode" />
    </div>

    

    <TreeNode v-for="child in node.children" :key="child.id" :node="child" :type="`child`" class="my-5 mx-14"
      @add-child="onAddChild" @edit-node="onEditNode" @delete-node="onDeleteNode" />
    
  </div>
</template>