import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { bootstrapSession } from "../store/slices/authSlice";
import { selectAuthStatus } from "../store/selectors";

interface SessionBootstrapProps {
  children: React.ReactNode;
}

export const SessionBootstrap = ({ children }: SessionBootstrapProps) => {
  const dispatch = useAppDispatch();
  const authStatus = useAppSelector(selectAuthStatus);
  const hasBootstrapped = useRef(false);

  useEffect(() => {
    if (authStatus === "idle" && !hasBootstrapped.current) {
      hasBootstrapped.current = true;
      dispatch(bootstrapSession());
    }
  }, [dispatch, authStatus]);

  if (authStatus === "loading" && !hasBootstrapped.current) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Verifying session...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
