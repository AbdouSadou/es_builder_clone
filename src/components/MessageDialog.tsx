import { AlertCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";

export function MessageDialog({
  isOpen,
  onClose,
  title,
  message,
  onConfirm,
  confirmText = "Confirm",
  cancelText = "Cancel",
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
}) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()} disablePointerDismissal={!!onConfirm}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2 text-red-600">
            <AlertCircle className="w-5 h-5" />
            <span>{title}</span>
          </DialogTitle>
          <DialogDescription className="pt-2 text-slate-700 whitespace-pre-wrap break-all text-base">
            {message}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-end gap-2 sm:gap-0">
          {onConfirm ? (
            <>
              <Button onClick={onClose} variant="outline" className="mt-2 sm:mt-0">
                {cancelText}
              </Button>
              <Button 
                onClick={() => {
                  onConfirm();
                  onClose();
                }} 
                variant="destructive"
              >
                {confirmText}
              </Button>
            </>
          ) : (
            <Button onClick={onClose} variant="default">
              Close
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
