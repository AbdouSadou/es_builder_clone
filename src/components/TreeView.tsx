// TreeView
import { useState } from "react";
import { useTree } from "../state/useTree";
import { EvaluationDialog } from "./EvaluationDialog";
import { TreeNodeComponent } from "./TreeNode";

export default function TreeView() {
  const { tree, initRoot, updateNode, addBranch, deleteNode, updateBranchLabel } = useTree();
  const [isEvaluating, setIsEvaluating] = useState(false);

  // Minimal validation before evaluating
  const validateTree = () => {
    if (!tree) return "Root does not exist. Please add a root node.";

    // Tree traversal for validation
    let error = "";
    const walk = (node: typeof tree) => {
      if (error) return; // Short circuit

      if (node.type === "decision") {
        if (!node.question?.trim()) {
          error = "A decision node has an empty question.";
          return;
        }
        if (!node.children || node.children.length === 0) {
          error = `Decision "${node.question}" has no branches. Must have >= 1 branch.`;
          return;
        }

        node.children.forEach(child => {
            walk(child.node);
        });
      } else if (node.type === "outcome") {
        if (!node.outcome?.trim()) {
          error = "An outcome node has an empty outcome.";
          return;
        }
      }
    };
    walk(tree);

    return error;
  };

  const handleEvaluate = () => {
    const errorMsg = validateTree();
    if (errorMsg) {
      alert(`Tree is incomplete:\n\n${errorMsg}`);
    } else {
      setIsEvaluating(true);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <header className="flex justify-between items-center p-4 bg-gray-800 text-white shadow">
        <h1 className="text-xl font-bold">ES-Builder (Tree UI)</h1>
        <div className="space-x-4">
          {!tree && (
            <button
              onClick={initRoot}
              className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded text-sm font-semibold shadow"
            >
              Add Root
            </button>
          )}
          {tree && (
            <button
              onClick={handleEvaluate}
              className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-sm font-semibold shadow"
            >
              Evaluate
            </button>
          )}
        </div>
      </header>

      <main className="flex-1 p-6 bg-gray-100 overflow-y-auto w-full">
        {tree ? (
          <div className="mx-auto w-full max-w-4xl bg-white shadow rounded-lg p-6">
            <TreeNodeComponent
              node={tree}
              updateNode={updateNode}
              addBranch={addBranch}
              deleteNode={deleteNode}
              updateBranchLabel={updateBranchLabel}
            />
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            No tree built. Click &quot;Add Root&quot; to begin.
          </div>
        )}
      </main>

      {isEvaluating && tree && (
        <EvaluationDialog tree={tree} onClose={() => setIsEvaluating(false)} />
      )}
    </div>
  );
}
