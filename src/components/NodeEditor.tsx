import { TreeNode } from "../types/tree";

export function NodeEditor({
  node,
  updateNode,
}: {
  node: TreeNode;
  updateNode: (id: string, updates: Partial<TreeNode>) => void;
}) {
  return (
    <div className="flex flex-col space-y-2 p-4 border rounded bg-white shadow-sm w-full mx-2 my-2">
      <div className="flex items-center space-x-2">
        <label className="text-sm font-medium">Type:</label>
        <select
          value={node.type}
          onChange={(e) =>
            updateNode(node.id, { type: e.target.value as "decision" | "outcome" })
          }
          className="border rounded p-1 text-sm"
        >
          <option value="decision">Decision</option>
          <option value="outcome">Outcome</option>
        </select>
      </div>

      {node.type === "decision" && (
        <div className="flex flex-col">
          <label className="text-sm font-medium">Question text:</label>
          <input
            type="text"
            value={node.question || ""}
            onChange={(e) => updateNode(node.id, { question: e.target.value })}
            className="border rounded px-2 py-1 text-sm"
            placeholder="e.g., Is age > 18?"
          />
        </div>
      )}

      {node.type === "outcome" && (
        <div className="flex flex-col">
          <label className="text-sm font-medium">Outcome text:</label>
          <input
            type="text"
            value={node.outcome || ""}
            onChange={(e) => updateNode(node.id, { outcome: e.target.value })}
            className="border rounded px-2 py-1 text-sm"
            placeholder="e.g., Approved"
          />
        </div>
      )}
    </div>
  );
}
