<script setup lang="ts">
import { ref, defineProps, defineEmits, onMounted, onUnmounted } from 'vue';
import ContextMenu from './ContextMenu.vue';
import TreeNode from './TreeNode.vue';
import { library } from "@fortawesome/fontawesome-svg-core";
import type { TreeNode as TreeNodeType } from '@/interfaces';
import { useTreeStore } from '@/stores/tree';
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

// Props
defineProps<{
  nodeIndex: string,
  node: TreeNodeType;
  type: string
}>();

// Emit events
const emit = defineEmits<{
  (event: "add-child"): void;
  (event: "edit-node"): void;
  (event: "delete-node"): void;
}>();

const treeStore = useTreeStore();
const { setActiveNode, deleteNode } = treeStore;

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
      <span class="text-gray-700 ml-2">{{ node.name }} </span>
      <button class="text-gray-500 hover:text-gray-700 focus:outline-none ml-2" @click="toggleMenu">
        <font-awesome-icon icon="ellipsis-v" class="text-gray-400" />
      </button>
      <ContextMenu 
        v-if="showMenu" 
        :nodeIndex="`${nodeIndex}`"
        @add-child="() => {
          setActiveNode(nodeIndex);
          closeMenu();
          emit('add-child');
        }"
        @edit-node="() => {
          setActiveNode(nodeIndex)
          closeMenu();
          emit('edit-node');
        }"
        @delete-node="() => {
          setActiveNode(nodeIndex)
          closeMenu();
          deleteNode(nodeIndex);
        }"
      />
    </div>
    <TreeNode 
      v-for="(child, index) in node.children" 
      :key="`node-${nodeIndex}-${index}`" 
      :node="child" 
      :type="`child`" 
      class="my-5 mx-14" 
      :class="`node-${nodeIndex}-${index}`" 
      :nodeIndex="`${nodeIndex}-${index}`"
      @add-child="$emit('add-child', $event)"
      @edit-node="$emit('edit-node', $event)"
      @delete-node="$emit('delete-node', $event)" />
    
  </div>
</template>