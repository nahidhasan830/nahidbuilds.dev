"use client";

import { createContext, useContext, useState } from "react";
import { ContactForm } from "@/components/contact-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type ContactDialogContextType = {
  open: boolean;
  setOpen: (open: boolean) => void;
  openContactDialog: () => void;
};

const ContactDialogContext = createContext<ContactDialogContextType | null>(
  null,
);

export function useContactDialog() {
  const context = useContext(ContactDialogContext);
  if (!context) {
    throw new Error(
      "useContactDialog must be used within ContactDialogProvider",
    );
  }
  return context;
}

export function ContactDialogProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  const openContactDialog = () => setOpen(true);

  return (
    <ContactDialogContext.Provider value={{ open, setOpen, openContactDialog }}>
      {children}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Get in touch</DialogTitle>
            <DialogDescription>
              Send me a message and I'll get back to you as soon as possible.
            </DialogDescription>
          </DialogHeader>
          <ContactForm onSuccess={() => setOpen(false)} />
        </DialogContent>
      </Dialog>
    </ContactDialogContext.Provider>
  );
}
