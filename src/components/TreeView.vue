<script setup lang="ts">
import { ref } from 'vue';
import { useTreeStore } from '@/stores/tree';
import TreeNode from './TreeNode.vue';
import GroupModal from './modals/GroupModal.vue';
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faMinus
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const treeStore = useTreeStore();
const { tree, activeNode, setActiveNode } = treeStore;

library.add(faMinus);

const isAddChildModalVisible = ref(false);
const closeAddChildModal = () => {
  isAddChildModalVisible.value = false;
};

const isEditNodeModalVisible = ref(false);
const closeEditNodeModal = () => {
  isEditNodeModalVisible.value = false;
};

</script>
<template>
  <div class="w-max relative tree-view m-5" :class="activeNode">
    <div class="absolute inset-x-0 inset-y-0 left-2 top-5 border-l-2 border-gray-300 border-dotted"></div>
    <div>
      <button
        class="w-5 h-5 flex items-center justify-center rounded border border-gray-400 text-sm focus:outline-none">
        <font-awesome-icon icon="minus" class="text-gray-500" />
      </button>
    </div>
    <GroupModal :name="`add-child`" :show="isAddChildModalVisible" @close="closeAddChildModal" class="z-10" />
    <GroupModal :name="`edit-node`" :show="isEditNodeModalVisible" @close="closeEditNodeModal" class="z-10" />
    <TreeNode 
      v-for="(node, index) in tree"
      :key="`node-${index}`" 
      :node="node" 
      :type="`parent`" 
      :class="`node-${index}`" 
      :nodeIndex="`${index}`"
      @add-child="isAddChildModalVisible = true" 
      @edit-node="isEditNodeModalVisible = true"
    />
  </div>
</template>