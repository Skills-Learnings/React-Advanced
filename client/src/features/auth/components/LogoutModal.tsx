import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog"
import { LoadingSpinner } from "@/components/ui/LoadingSpinner"
import { DialogTitle } from "@radix-ui/react-dialog"

type Props = {
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
}

export default function LogoutModal({ isOpen, onOpenChange }: Props) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Logging Out</DialogTitle>
        </DialogHeader>
        <LoadingSpinner className="w-12 h-12" />
      </DialogContent>
    </Dialog>
  )
}
