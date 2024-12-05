import { defineStore } from 'pinia';

export const useTreeStore = defineStore('tree', {
  state: () => ({
    treeData: [],
  }),
  actions: {
    addChild(parentId, child) {
      // Logic to add child
    },
    editNode(nodeId, newName) {
      // Logic to edit node
    },
    deleteNode(nodeId) {
      // Logic to delete node
    },
  },
});