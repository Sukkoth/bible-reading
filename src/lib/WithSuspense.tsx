import { ComponentType, Suspense, ReactNode } from "react";

export interface withSuspenseProps {
  children?: ReactNode;
}

function withSuspense<P extends withSuspenseProps>(
  LazyComponent: ComponentType<P>,
  fallback: ReactNode
): ComponentType<P> {
  return (props: P) => (
    <Suspense fallback={fallback}>
      <LazyComponent {...props} />
    </Suspense>
  );
}

export default withSuspense;
