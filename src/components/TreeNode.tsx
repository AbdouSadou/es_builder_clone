// TreeNodeComponent
import { ChevronDown, ChevronRight, GitBranch, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { TreeNode } from "../types/tree";
import { NodeEditor } from "./NodeEditor";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

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
    <div className="flex flex-col ml-6 border-l-2 pl-6 border-slate-200 relative my-4">
      {parentId && (
        <div className="absolute -left-0.5 top-6 w-6 border-t-2 border-slate-200" />
      )}
      <div className="flex flex-row items-start relative bg-white p-4 rounded-xl shadow-sm border border-slate-200 transition-all hover:border-blue-200 w-full">
        <div className="flex-1 w-full flex flex-col space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Badge variant={node.type === "decision" ? "default" : "secondary"} className={node.type === "decision" ? "bg-blue-600 hover:bg-blue-700 select-none" : "bg-amber-100 text-amber-800 hover:bg-amber-200 select-none"}>
                {node.type === "decision" ? "Decision" : "Outcome"}
              </Badge>
              <span className="text-xs text-slate-400 font-mono flex items-center">
                #{node.id.substring(0, 4)}
              </span>
            </div>
            
            <div className="flex items-center space-x-1">
              {node.children && node.children.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setExpanded(!expanded)}
                  className="h-8 px-2 text-slate-500 hover:text-slate-900"
                >
                  {expanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                </Button>
              )}
            </div>
          </div>
          
          <NodeEditor node={node} updateNode={updateNode} />

          <div className="pt-2 flex flex-wrap gap-2 justify-end items-center border-t border-slate-100">
            {node.type === "decision" && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => addBranch(node.id)}
                className="h-8 text-blue-600 border-blue-200 hover:bg-blue-50"
              >
                <Plus className="mr-1 h-3 w-3" /> Branch
              </Button>
            )}
            <Button
              size="sm"
              variant="ghost"
              onClick={() => deleteNode(node.id)}
              className="h-8 text-red-500 hover:text-red-700 hover:bg-red-50 px-2"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {expanded && node.type === "decision" && node.children && (
        <div className="flex flex-col mt-4 space-y-4">
          {node.children.map((child, idx) => (
            <div key={`${node.id}-${child.node.id}`} className="flex flex-col relative w-full">
              <div className="flex items-center space-x-2 mb-2 ml-6 z-10">
                <div className="flex items-center bg-green-200 px-2 py-1 rounded-md border border-slate-200 shadow-sm">
                  <GitBranch className="h-5 w-5 text-slate-400 mr-2" />
                  <Input
                    className="h-15 w-50 px-1 py-0 text-xs border-none shadow-none focus-visible:ring-1 focus-visible:ring-blue-400 font-medium"
                    type="text"
                    value={child.label}
                    onChange={(e) => updateBranchLabel(node.id, child.node.id, e.target.value)}
                    placeholder="Branch label"
                  />
                </div>
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
