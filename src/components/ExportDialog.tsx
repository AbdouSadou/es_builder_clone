import { Download } from "lucide-react";
import { useState } from "react";
import { TreeNode } from "../types/tree";
import { ExportFormat, exportTree } from "../utils/exportTree";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

export function ExportDialog({ tree, isOpen, onClose }: { tree: TreeNode | null; isOpen: boolean; onClose: () => void }) {
  const [format, setFormat] = useState<ExportFormat>("json");

  const handleExport = () => {
    if (tree) {
      exportTree(tree, format);
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Export Your Tree</DialogTitle>
          <DialogDescription>
            Choose a format to download your project.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4 flex flex-col space-y-4">
          <Select value={format} onValueChange={(val) => { if (val) setFormat(val as ExportFormat) }}>
            <SelectTrigger className="uppercase w-50">
              <SelectValue placeholder="Select format" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="json">JSON (.json)</SelectItem>
              <SelectItem value="txt">Plain Text (.txt)</SelectItem>
              <SelectItem value="doc">MS Word (.doc)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleExport} className="bg-blue-600 hover:bg-blue-700 text-white">
            <Download className="mr-2 h-4 w-4" />
            Download File
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
