// EvaluationDialog
import { useState } from "react";
import { TreeNode } from "../types/tree";

export function EvaluationDialog({
  tree,
  onClose,
}: {
  tree: TreeNode;
  onClose: () => void;
}) {
  const [currentNode, setCurrentNode] = useState<TreeNode>(tree);

  const traverse = (choice: string) => {
    if (currentNode.type === "outcome") return;
    const branch = currentNode.children?.find((c) => c.label === choice);
    if (branch && branch.node) {
      setCurrentNode(branch.node);
    }
  };

  const restart = () => {
    setCurrentNode(tree);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6">
        <h2 className="text-xl font-bold border-b pb-2 mb-4">Evaluate Tree</h2>

        <div className="min-h-37.5 flex flex-col justify-center items-center">
          {currentNode.type === "decision" ? (
            <div className="w-full text-center">
              <p className="text-lg mb-6">{currentNode.question || "No Question Provided"}</p>
              <div className="flex flex-wrap justify-center gap-4">
                {currentNode.children?.map((child) => (
                  <button
                    key={child.label}
                    onClick={() => traverse(child.label)}
                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded shadow transition-colors"
                  >
                    {child.label}
                  </button>
                )) || <div className="text-red-500 text-sm">No branches available</div>}
              </div>
            </div>
          ) : (
            <div className="w-full text-center">
              <p className="text-lg font-bold text-green-600 mb-6">Outcome Reached</p>
              <p className="text-2xl">{currentNode.outcome || "No Outcome Provided"}</p>
            </div>
          )}
        </div>

        <div className="mt-8 flex justify-end space-x-4 pt-4 border-t">
          {currentNode !== tree && (
            <button
              onClick={restart}
              className="px-4 py-2 border rounded hover:bg-gray-100"
            >
              Restart
            </button>
          )}
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-900"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
