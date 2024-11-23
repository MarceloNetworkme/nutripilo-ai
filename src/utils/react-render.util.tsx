import { useEffect } from "react";

// This object is used to track the number of times a function is called
const callCount: Record<string, number> = {};

// This function is used to track the number of times a function is called
const trackCall = (functionId: string) => {
  const curr = callCount[functionId] || 0;
  callCount[functionId] = curr + 1;
  return curr;
};

// This hook is used to reset the call tracking after the render cycle
export const useFnCallCount = (functionId: string) => {
  useEffect(() => {
    setTimeout(() => {
      callCount[functionId] = 0;
    }, 0);
  });

  return trackCall;
};
