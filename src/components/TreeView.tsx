// TreeView
import { Plus } from "lucide-react";
import { useState } from "react";
import { useTree } from "../state/useTree";
import { EvaluationDialog } from "./EvaluationDialog";
import { MessageDialog } from "./MessageDialog";
import { TopBar } from "./TopBar";
import { TreeNodeComponent } from "./TreeNode";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";

export default function TreeView() {
  const { tree, isHydrated, initRoot, updateNode, addBranch, deleteNode, updateBranchLabel } = useTree();
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [errorDialog, setErrorDialog] = useState({ isOpen: false, message: "" });
  const [nodeToDelete, setNodeToDelete] = useState<string | null>(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

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
      setErrorDialog({
        isOpen: true,
        message: errorMsg
      });
    } else {
      setIsEvaluating(true);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-slate-50">
<TopBar
        isHydrated={isHydrated}
        hasTree={!!tree}
        onInitRoot={initRoot}
        onEvaluate={handleEvaluate}
        onClear={() => setShowClearConfirm(true)}
      />

      <main className="flex-1 overflow-hidden relative">
        <ScrollArea className="h-full w-full p-4 md:p-8">
          {!isHydrated ? (
            <div className="flex justify-center items-center h-[calc(100vh-8rem)]">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : tree ? (
            <div className="mx-auto w-full max-w-5xl pb-20">
              <TreeNodeComponent
                node={tree}
                updateNode={updateNode}
                addBranch={addBranch}
                deleteNode={setNodeToDelete}
                updateBranchLabel={updateBranchLabel}
              />
            </div>
          ) : (
            <div className="flex items-center justify-center h-[calc(100vh-8rem)]">
               <Card className="w-full max-w-md shadow-sm border-dashed border-2">
                 <CardContent className="flex flex-col items-center justify-center p-12 text-center text-slate-500 space-y-4">
                   <div className="bg-slate-100 p-4 rounded-full">
                     <Plus className="h-8 w-8 text-slate-400" />
                   </div>
                   <div>
                     <h3 className="text-lg font-medium text-slate-900">No tree structure</h3>
                     <p className="text-sm mt-1">Start by adding a root node to build your decision tree.</p>
                   </div>
                    <Button onClick={initRoot} className="bg-emerald-600 hover:bg-emerald-700 text-white">
                    <Plus className="mr-2 h-4 w-4" />
                    Initialise Tree
                    </Button>
                 </CardContent>
               </Card>
            </div>
          )}
        </ScrollArea>
      </main>

      {isEvaluating && tree && (
        <EvaluationDialog tree={tree} onClose={() => setIsEvaluating(false)} />
      )}

      <MessageDialog 
        isOpen={errorDialog.isOpen} 
        onClose={() => setErrorDialog({ isOpen: false, message: "" })} 
        title="Tree is incomplete" 
        message={errorDialog.message} 
      />
      
      <MessageDialog
        isOpen={nodeToDelete !== null}
        onClose={() => setNodeToDelete(null)}
        title="Confirm Deletion"
        message="Are you sure you want to delete this node? This action will also delete all its child branches."
        onConfirm={() => {
          if (nodeToDelete) deleteNode(nodeToDelete);
          setNodeToDelete(null);
        }}
        confirmText="Delete Node"
        cancelText="Cancel"
      />
      <MessageDialog
        isOpen={showClearConfirm}
        onClose={() => setShowClearConfirm(false)}
        title="Clear Entire Project"
        message="Are you sure you want to clear the entire project? This will delete all nodes and cannot be undone."
        onConfirm={() => {
          localStorage.removeItem("es-builder-tree-v1");
          window.location.reload();
        }}
        confirmText="Clear Project"
        cancelText="Cancel"
      />    </div>
  );
}
