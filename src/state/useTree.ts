import { useCallback, useState } from "react";
import { TreeNode } from "../types/tree";

export function useTree() {
  const [tree, setTree] = useState<TreeNode | null>(null);

  const initRoot = () => {
    setTree({
      id: "root",
      type: "decision",
      question: "New Question Context",
      children: [],
    });
  };

  const updateNode = useCallback(
    (id: string, updates: Partial<TreeNode>) => {
      setTree((prev) => {
        if (!prev) return null;
        return mapTree(prev, (node) =>
          node.id === id ? { ...node, ...updates } : node
        );
      });
    },
    []
  );

  const addBranch = useCallback((parentId: string) => {
    setTree((prev) => {
      if (!prev) return null;
      return mapTree(prev, (node) => {
        if (node.id === parentId && node.type === "decision") {
          const newId = Math.random().toString(36).substr(2, 9);
          return {
            ...node,
            children: [
              ...(node.children || []),
              {
                label: `Option ${(node.children?.length || 0) + 1}`,
                node: { id: newId, type: "outcome", outcome: "New Outcome" },
              },
            ],
          };
        }
        return node;
      });
    });
  }, []);

  const deleteNode = useCallback((id: string) => {
    if (id === "root") {
      setTree(null);
      return;
    }
    setTree((prev) => {
      if (!prev) return null;
      return deleteFromTree(prev, id);
    });
  }, []);

  const updateBranchLabel = useCallback((parentId: string, childId: string, newLabel: string) => {
    setTree((prev) => {
      if (!prev) return null;
      return mapTree(prev, (node) => {
        if (node.id === parentId && node.type === "decision") {
          return {
            ...node,
            children: node.children?.map((child) =>
              child.node.id === childId ? { ...child, label: newLabel } : child
            ),
          };
        }
        return node;
      });
    });
  }, []);

  return { tree, initRoot, updateNode, addBranch, deleteNode, updateBranchLabel };
}

function mapTree(node: TreeNode, fn: (node: TreeNode) => TreeNode): TreeNode {
  const updated = fn({ ...node });
  if (updated.children) {
    updated.children = updated.children.map((child) => ({
      ...child,
      node: mapTree(child.node, fn),
    }));
  }
  return updated;
}

function deleteFromTree(node: TreeNode, targetId: string): TreeNode | null {
  if (node.id === targetId) return null;
  if (!node.children) return node;

  return {
    ...node,
    children: node.children
      .map((child) => {
        const keptChild = deleteFromTree(child.node, targetId);
        if (!keptChild) return null;
        return { ...child, node: keptChild };
      })
      .filter((c): c is NonNullable<typeof c> => c !== null),
  };
}
