import type {TreeNode as TreeNodeType} from './treeNode'

export interface ContextMenu {
    addChild: (parentId: number, child: TreeNodeType) => void;
    editNode: (nodeId: number, newName: string) => void;
    deleteNode: (nodeId: number) => void;
}