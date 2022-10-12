import React, { useState, useEffect } from "react";
import { Prompt } from "react-router-dom";

const useUnsavedChangesWarning = (
  message = "Unsaved changes. Are you sure you want to leave?"
) => {
  const [isDirty, setIsDirty] = useState(false);

  // detect browser closing using 'beforeunload' window event & cleanup fn
  useEffect(() => {
    window.onbeforeunload = isDirty && (() => message); // if the form isDirty, return the msg

    return () => {
      window.onbeforeunload = null; // clear the event, cleanup fn when comp unmounts
    };
  }, [isDirty]);

  // show the prompt message whenever before the user is navigating away from a page.
  const routerPrompt = <Prompt when={isDirty} message={message} />;

  const setFormState = (formState) => {
    if (formState === "modified") {
      setIsDirty(true);
    } else if (formState === "unchanged") {
      setIsDirty(false);
    }
  };

  return [routerPrompt, setFormState];
};

export default useUnsavedChangesWarning;

// returned from the custom hook in the order
// routerPrompt - (Prompt in form)
// () => setIsDirty(true) - set the form dirty (setDirty in form)
// () => setIsDirty(false) - set the form pristine, not dirty (setPristine in form)
//   return [routerPrompt, () => setIsDirty(true), () => setIsDirty(false)];
