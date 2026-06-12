"use client";

import { useEffect, useRef, useState } from "react";

import { solverMatrixPreviews } from "@/components/solver-matrix/solver-matrix-data";
import { SolverDisclaimer } from "@/components/solver-matrix/solver-disclaimer";
import { SolverPreviewCard } from "@/components/solver-matrix/solver-preview-card";
import { SolverTrustRow } from "@/components/solver-matrix/solver-trust-row";

export function SolverMatrixSection() {
  const [activePreviewId, setActivePreviewId] = useState<string | null>(null);
  const [loadingPreviewId, setLoadingPreviewId] = useState<string | null>(null);
  const [resultPreviewId, setResultPreviewId] = useState<string | null>(null);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, []);

  function handleTryPreview(previewId: string) {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
    }

    setActivePreviewId(previewId);
    setLoadingPreviewId(previewId);
    setResultPreviewId(null);

    timerRef.current = window.setTimeout(() => {
      setLoadingPreviewId(null);
      setResultPreviewId(previewId);
    }, 1000);
  }

  return (
    <section id="solver-matrix">
      <div className="rounded-3xl border border-white/55 bg-white/75 p-6 shadow-xl shadow-slate-900/5 backdrop-blur-xl sm:p-8 lg:p-10">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-action">
              Solver Matrix
            </p>
            <h2 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-ink sm:text-5xl">
              Static solver previews for popular puzzle boards
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-muted sm:text-base sm:leading-7">
            A unified homepage preview section with static board states, mock
            move guidance, and responsive cards for six puzzle solvers.
          </p>
        </div>

        <SolverTrustRow />

        <div className="mt-8 grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
          {solverMatrixPreviews.map((preview) => {
            const isActive = activePreviewId === preview.id;
            const status =
              isActive && loadingPreviewId === preview.id
                ? "loading"
                : isActive && resultPreviewId === preview.id
                  ? "result"
                  : "idle";

            return (
              <SolverPreviewCard
                key={preview.id}
                preview={preview}
                isActive={isActive}
                status={status}
                onTryPreview={() => handleTryPreview(preview.id)}
              />
            );
          })}
        </div>

        <SolverDisclaimer />
      </div>
    </section>
  );
}
