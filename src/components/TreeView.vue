<script setup lang="ts">
import { ref } from 'vue';
import TreeNode from './TreeNode.vue';
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faMinus
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faMinus);

// Define the type for a tree node
interface TreeNodeType {
  id: number;
  name: string;
  children: TreeNodeType[];
}

// Create a reactive treeData array with the TreeNodeType type
const treeData = ref<TreeNodeType[]>([
  {
    id: 1, name: 'Hospital A', children: [
      { id: 1, name: 'Shoulder', children: [] },
      { id: 2, name: 'Knee', children: [] },
      {
        id: 1, name: 'Stomack', children: [
          { id: 1, name: "Crohn's Disease", children: [] },
          { id: 2, name: 'Irritable Bowel Syndrome', children: [] },
          {
            id: 1, name: 'Ulcerative Colitis', children: [
              { id: 1, name: "Crohn's Disease", children: [] },
              { id: 2, name: 'Irritable Bowel Syndrome', children: [] },
              {
                id: 1, name: 'Ulcerative Colitis', children: [
                  { id: 1, name: "Crohn's Disease", children: [] },
                  { id: 2, name: 'Irritable Bowel Syndrome', children: [] },
                  { id: 1, name: 'Ulcerative Colitis', children: [] }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 2, name: 'Hospital B', children: [
      { id: 1, name: 'Gamling addiction', children: [] },
      { id: 2, name: 'Anxiety', children: [] },
      { id: 3, name: 'Depression', children: [] },
    ]
  },
]);

// Define methods with TypeScript typing
const addChild = (parentId: number, child: TreeNodeType) => {
  const parentNode = findNodeById(parentId, treeData.value);
  if (parentNode) {
    parentNode.children.push(child);
  }
};

const editNode = (nodeId: number, newName: string) => {
  const node = findNodeById(nodeId, treeData.value);
  if (node) {
    node.name = newName;
  }
};

const deleteNode = (nodeId: number) => {
  removeNodeById(nodeId, treeData.value);
};

// Helper functions to manipulate tree nodes
const findNodeById = (id: number, nodes: TreeNodeType[]): TreeNodeType | null => {
  for (const node of nodes) {
    if (node.id === id) return node;
    const found = findNodeById(id, node.children);
    if (found) return found;
  }
  return null;
};

const removeNodeById = (id: number, nodes: TreeNodeType[]) => {
  const index = nodes.findIndex((node) => node.id === id);
  if (index !== -1) {
    nodes.splice(index, 1);
    return;
  }
  for (const node of nodes) {
    removeNodeById(id, node.children);
  }
};
</script>
<template>
  <div class="w-max relative tree-view m-5">
    <div class="absolute inset-x-0 inset-y-0 left-2 top-5 border-l-2 border-gray-300 border-dotted"></div>
    <div>
      <button
        class="w-5 h-5 flex items-center justify-center rounded border border-gray-400 text-sm focus:outline-none">
        <font-awesome-icon icon="minus" class="text-gray-500" />
      </button>
    </div>

    <TreeNode v-for="node in treeData" :key="node.id" :node="node" :type="`parent`"
      @add-child="addChild" @edit-node="editNode" @delete-node="deleteNode" />
  </div>
</template>
