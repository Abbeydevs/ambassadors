"use client";

import { useEffect } from "react";

type ViewIncrementerProps = {
  incrementAction: (id: string) => Promise<void>;
  entityId: string;
};

export function ViewIncrementer({
  incrementAction,
  entityId,
}: ViewIncrementerProps) {
  useEffect(() => {
    const incrementView = () => {
      incrementAction(entityId);
    };

    const timer = setTimeout(incrementView, 1000);

    return () => clearTimeout(timer);
  }, [incrementAction, entityId]);

  return null;
}
