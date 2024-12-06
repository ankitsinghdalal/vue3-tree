import { ref } from 'vue'
import { defineStore } from 'pinia';
import type {
  TreeNode as TreeNodeType,
} from '@/interfaces';

export const useTreeStore = defineStore('tree', () => {
  const activeNode = ref<string>('0');
  const setActiveNode = (activeNodeIndex: string): void => {
    activeNode.value = activeNodeIndex;
  }

  const tree = ref<TreeNodeType[]>([
    {
      id: 1,
      name: 'Hospital A',
      children: [
        {
          id: 1,
          name: 'Shoulder',
          children: []
        },
        {
          id: 2,
          name: 'Knee',
          children: []
        },
        {
          id: 3,
          name: 'Stomack',
          children: [
            {
              id: 1,
              name: "Crohn's Disease",
              children: []
            },
            {
              id: 2,
              name: 'Irritable Bowel Syndrome',
              children: []
            },
            {
              id: 3,
              name: 'Ulcerative Colitis',
              children: [
                {
                  id: 1,
                  name: "Crohn's Disease",
                  children: []
                },
                {
                  id: 2,
                  name: 'Irritable Bowel Syndrome',
                  children: []
                },
                {
                  id: 3,
                  name: 'Ulcerative Colitis',
                  children: [
                    {
                      id: 1,
                      name: "Crohn's Disease",
                      children: []
                    },
                    {
                      id: 2,
                      name: 'Irritable Bowel Syndrome',
                      children: []
                    },
                    {
                      id: 3,
                      name: 'Ulcerative Colitis',
                      children: []
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 2,
      name: 'Hospital B',
      children: [
        {
          id: 1,
          name: 'Gamling addiction',
          children: []
        },
        {
          id: 2,
          name: 'Anxiety',
          children: []
        },
        {
          id: 3,
          name: 'Depression',
          children: []
        },
      ]
    }
  ]);

  const getNodeAtPath = (activeNodeIndex: string): TreeNodeType | null => {
    const indexes = activeNodeIndex.split('-').map(Number); // Convert the string to an array of numbers
    let currentNode: TreeNodeType | null = null;

    // Traverse the tree based on the indexes
    for (let i = 0; i < indexes.length; i++) {
      const index = indexes[i];

      if (i === 0) {
        // At the root level, access the tree array
        currentNode = tree.value[index];
      } else if (currentNode && currentNode.children) {
        // Traverse to the children at the current level
        currentNode = currentNode.children[index];
      } else {
        // Invalid path
        return null;
      }

      // If the node doesn't exist, return null
      if (!currentNode) {
        return null;
      }
    }

    return currentNode;
  };

  const addChild = (activeNodeIndex: string, child: TreeNodeType) => {
    const parentNode = getNodeAtPath(activeNodeIndex);
    if (parentNode) {
      parentNode.children.push(child);
    }
  };

  const editNode = (activeNodeIndex: string, groupName: string) => {
    const parentNode = getNodeAtPath(activeNodeIndex);
    if(parentNode) {
      parentNode.name = groupName;
    }
  };

  const deleteNode = (activeNodeIndex: string): void => {
    const indexes = activeNodeIndex.split('-').map(Number);
    const targetIndex = indexes.pop();
    const parentIndexes = indexes.join('-');

    // Get the parent node
    const parentNode = parentIndexes === ''
      ? { children: tree.value } as TreeNodeType // Handle root-level nodes
      : getNodeAtPath(parentIndexes);

    if (parentNode && parentNode.children && targetIndex !== undefined) {
      parentNode.children.splice(targetIndex, 1); // Remove the node
    }
  };

  return { activeNode, setActiveNode, tree, addChild, editNode, deleteNode, getNodeAtPath };
});