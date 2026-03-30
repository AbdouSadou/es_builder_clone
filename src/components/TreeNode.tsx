// TreeNodeComponent
import { useState } from "react";
import { TreeNode } from "../types/tree";
import { NodeEditor } from "./NodeEditor";

export function TreeNodeComponent({
  node,
  updateNode,
  addBranch,
  deleteNode,
  updateBranchLabel,
  parentId,
}: {
  node: TreeNode;
  updateNode: (id: string, updates: Partial<TreeNode>) => void;
  addBranch: (parentId: string) => void;
  deleteNode: (id: string) => void;
  updateBranchLabel: (parentId: string, childId: string, label: string) => void;
  parentId?: string;
}) {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="flex flex-col ml-4 border-l-2 pl-4 border-gray-300 relative my-2">
      <div className="absolute -left-2 top-4 w-4 border-t-2 border-gray-300" />
      <div className="flex flex-row items-start relative bg-gray-50 p-2 rounded shadow-sm border border-gray-200">
        <div className="flex-1">
          <div className="text-sm font-semibold mb-2">
            Node ID: {node.id.substring(0, 4)}
            {node.children && node.children.length > 0 && (
              <button
                onClick={() => setExpanded(!expanded)}
                className="ml-2 text-xs bg-gray-200 hover:bg-gray-300 rounded px-2 py-0.5"
              >
                {expanded ? "Collapse" : "Expand"}
              </button>
            )}
          </div>
          <NodeEditor node={node} updateNode={updateNode} />
          
          <div className="mt-2 flex space-x-2">
            {node.type === "decision" && (
              <button
                onClick={() => addBranch(node.id)}
                className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-2 py-1 rounded shadow"
              >
                + Add Branch
              </button>
            )}
            <button
              onClick={() => deleteNode(node.id)}
              className="bg-red-500 hover:bg-red-600 text-white text-xs px-2 py-1 rounded shadow"
            >
              Delete Node
            </button>
          </div>
        </div>
      </div>

      {expanded && node.type === "decision" && node.children && (
        <div className="flex flex-col mt-2 space-y-2">
          {node.children.map((child, idx) => (
            <div key={`${node.id}-${child.node.id}`} className="flex flex-col mt-2 ml-4 relative">
              <div className="flex items-center space-x-2 mb-1">
                <span className="text-xs text-gray-500 font-bold uppercase tracking-wider bg-gray-100 rounded px-1">Branch Label:</span>
                <input
                  type="text"
                  value={child.label}
                  onChange={(e) => updateBranchLabel(node.id, child.node.id, e.target.value)}
                  className="border rounded px-1 py-0.5 text-xs focus:ring focus:ring-blue-200 focus:outline-none w-32"
                />
              </div>
              <TreeNodeComponent
                node={child.node}
                updateNode={updateNode}
                addBranch={addBranch}
                deleteNode={deleteNode}
                updateBranchLabel={updateBranchLabel}
                parentId={node.id}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
