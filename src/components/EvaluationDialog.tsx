// EvaluationDialog
import { CheckCircle2, Clapperboard, RotateCcw } from "lucide-react";
import { useState } from "react";
import { TreeNode } from "../types/tree";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";

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
    <Dialog open={true} onOpenChange={(open) => !open && onClose()} disablePointerDismissal>
      <DialogContent className="sm:max-w-200 h-130">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center space-x-2">
            <Clapperboard className="w-5 h-5 text-blue-600" />
            <span>Interactive Evaluation</span>
          </DialogTitle>
          <DialogDescription>
            Step through the decision tree logic to reach an outcome.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col justify-center items-center py-6 bg-slate-50/50 rounded-lg border border-slate-100 my-4 max-w-full overflow-hidden">
          {currentNode.type === "decision" ? (
            <div className="w-full text-center px-6 overflow-hidden flex flex-col gap-15">
              <h3 className="text-xl font-medium text-slate-800 mb-8 whitespace-pre-wrap break-all">
                {currentNode.question || "No Question Provided"}
              </h3>
              <div className="flex flex-wrap justify-center gap-3">
                {currentNode.children?.map((child) => (
                  <Button
                    key={child.label}
                    onClick={() => traverse(child.label)}
                    variant="outline"
                    className="min-w-30 border-blue-200 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300 transition-all font-medium py-6 h-auto whitespace-normal max-w-full break-all"
                  >
                    {child.label}
                  </Button>
                )) || <p className="text-red-500 text-sm">No valid branches</p>}
              </div>
            </div>
          ) : (
            <div className="w-full text-center px-6 animate-in fade-in zoom-in duration-300">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 className="w-8 h-8 text-green-600" />
              </div>
              <p className="text-sm font-semibold text-green-600 uppercase tracking-widest mb-2">Final Outcome</p>
              <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-linear-to-r from-slate-800 to-slate-600 break-all whitespace-pre-wrap">
                {currentNode.outcome || "No Outcome Provided"}
              </h2>
            </div>
          )}
        </div>

        <DialogFooter className="flex space-x-2 sm:justify-between items-center border-t pt-4">
          <Button
            variant="outline"
            size={"lg"}
            onClick={restart}
            disabled={currentNode === tree}
            className="text-slate-500"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Start Over
          </Button>
          <Button onClick={onClose} className="bg-slate-900 hover:bg-slate-800">
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
