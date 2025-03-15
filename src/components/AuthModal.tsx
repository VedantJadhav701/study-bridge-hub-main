
import { useState } from "react";
import { useUser } from "@/contexts/UserContext";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Github, Mail, Loader2 } from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  actionType?: "download" | "upload" | "rate" | "general";
}

const AuthModal = ({ isOpen, onClose, actionType = "general" }: AuthModalProps) => {
  const { login, isLoading } = useUser();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async (provider: "google" | "github") => {
    setIsSubmitting(true);
    await login(provider);
    setIsSubmitting(false);
    onClose();
  };

  const actionMessages = {
    download: "to download this resource",
    upload: "to upload resources",
    rate: "to rate and comment on resources",
    general: "to access all features"
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Login to Study Hub</DialogTitle>
          <DialogDescription>
            You need to login {actionMessages[actionType]}. 
            Use your institutional email for full access.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Button
            onClick={() => handleLogin("google")}
            disabled={isLoading || isSubmitting}
            className="w-full"
            variant="outline"
          >
            {isSubmitting ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Mail className="mr-2 h-4 w-4" />
            )}
            Login with Institutional Email
          </Button>
          <Button
            onClick={() => handleLogin("github")}
            disabled={isLoading || isSubmitting}
            className="w-full"
            variant="outline"
          >
            {isSubmitting ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Github className="mr-2 h-4 w-4" />
            )}
            Login with GitHub
          </Button>
        </div>
        <DialogFooter className="sm:justify-start">
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;