import { TreeNode } from "../types/tree";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

export function NodeEditor({
  node,
  updateNode,
}: {
  node: TreeNode;
  updateNode: (id: string, updates: Partial<TreeNode>) => void;
}) {
  return (
    <div className="flex flex-col space-y-4 p-4 border rounded-md bg-white shadow-sm w-full">
      <div className="flex items-center space-x-3">
        <Label htmlFor={`type-${node.id}`} className="text-sm font-medium w-16">Type</Label>
        <Select
          value={node.type}
          onValueChange={(val) => updateNode(node.id, { type: val as "decision" | "outcome" })}
        >
          <SelectTrigger className="w-40 capitalize" id={`type-${node.id}`}>
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="decision">Decision</SelectItem>
            <SelectItem value="outcome">Outcome</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {node.type === "decision" && (
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor={`q-${node.id}`} className="text-sm font-medium">Question</Label>
          <Input
            id={`q-${node.id}`}
            type="text"
            value={node.question || ""}
            onChange={(e) => updateNode(node.id, { question: e.target.value })}
            placeholder="e.g., Is age > 18?"
          />
        </div>
      )}

      {node.type === "outcome" && (
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor={`o-${node.id}`} className="text-sm font-medium">Outcome</Label>
          <Input
            id={`o-${node.id}`}
            type="text"
            value={node.outcome || ""}
            onChange={(e) => updateNode(node.id, { outcome: e.target.value })}
            placeholder="e.g., Approved"
          />
        </div>
      )}
    </div>
  );
}
