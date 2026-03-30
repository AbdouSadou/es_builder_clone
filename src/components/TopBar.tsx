import { Play, Plus, Trash2 } from "lucide-react";
import { Button } from "./ui/button";

export function TopBar({
  hasTree,
  isHydrated,
  onInitRoot,
  onEvaluate,
  onClear,
}: {
  hasTree: boolean;
  isHydrated: boolean;
  onInitRoot: () => void;
  onEvaluate: () => void;
  onClear: () => void;
}) {
  return (
    <header className="flex justify-between items-center p-4 bg-white border-b shadow-sm z-10 shrink-0">
      <div className="flex items-center space-x-2">
        <div className="h-8 w-8 bg-blue-600 rounded-md flex items-center justify-center">
          <span className="text-white font-bold text-sm">DTB</span>
        </div>
        <h1 className="text-xl font-bold text-slate-800">Decision Tree Builder</h1>
        <span className="text-xs text-slate-500">by Abdou Sadou</span>
      </div>
      <div className="space-x-3 flex">
        {isHydrated && !hasTree && (
          <Button onClick={onInitRoot} className="bg-emerald-600 hover:bg-emerald-700 text-white">
            <Plus className="mr-2 h-4 w-4" />
            Initialize Tree
          </Button>
        )}
        {isHydrated && hasTree && (
          <>
            <Button variant="outline" onClick={onClear} className="text-red-500 hover:text-red-700 hover:bg-red-50 border-red-200">
              <Trash2 className="mr-2 h-4 w-4" />
              Clear Project
            </Button>
            <Button onClick={onEvaluate} className="bg-blue-600 hover:bg-blue-700 text-white shadow-md">
              <Play className="mr-2 h-4 w-4" />
              Evaluate Tree
            </Button>
          </>
        )}
      </div>
    </header>
  );
}