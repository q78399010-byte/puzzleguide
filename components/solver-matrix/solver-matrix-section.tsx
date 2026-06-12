"use client";

import { useEffect, useRef, useState } from "react";

import { solverMatrixPreviews } from "@/components/solver-matrix/solver-matrix-data";
import { SolverDisclaimer } from "@/components/solver-matrix/solver-disclaimer";
import { SolverPreviewCard } from "@/components/solver-matrix/solver-preview-card";
import type { DemoStatus } from "@/components/solver-matrix/demo-result-panel";
import { SolverTrustRow } from "@/components/solver-matrix/solver-trust-row";

type CardState = {
  uploaded: boolean;
  phase: DemoStatus;
};

const analysisSequence: Array<Exclude<DemoStatus, "idle" | "uploaded" | "result">> = [
  "scanning",
  "detecting",
  "calculating",
  "preparing"
];

function createInitialState() {
  return Object.fromEntries(
    solverMatrixPreviews.map((preview) => [
      preview.id,
      { uploaded: false, phase: "idle" as const }
    ])
  ) as Record<string, CardState>;
}

export function SolverMatrixSection() {
  const [cardState, setCardState] = useState<Record<string, CardState>>(
    createInitialState
  );
  const timersRef = useRef<Record<string, number[]>>({});

  useEffect(() => {
    return () => {
      Object.values(timersRef.current).forEach((timers) => {
        timers.forEach((timer) => window.clearTimeout(timer));
      });
    };
  }, []);

  function clearTimers(previewId: string) {
    const timers = timersRef.current[previewId];
    if (!timers) {
      return;
    }

    timers.forEach((timer) => window.clearTimeout(timer));
    delete timersRef.current[previewId];
  }

  function setPhase(previewId: string, phase: DemoStatus) {
    setCardState((current) => ({
      ...current,
      [previewId]: { ...current[previewId], phase }
    }));
  }

  function handleUpload(previewId: string) {
    clearTimers(previewId);
    setCardState((current) => ({
      ...current,
      [previewId]: { uploaded: true, phase: "uploaded" }
    }));
  }

  function handleAnalyze(previewId: string) {
    clearTimers(previewId);
    setPhase(previewId, "scanning");

    const timers = analysisSequence.map((nextPhase, index) =>
      window.setTimeout(() => {
        setPhase(previewId, nextPhase);

        if (index === analysisSequence.length - 1) {
          const resultTimer = window.setTimeout(() => {
            setPhase(previewId, "result");
            delete timersRef.current[previewId];
          }, 900);

          timersRef.current[previewId] = [
            ...(timersRef.current[previewId] ?? []),
            resultTimer
          ];
        }
      }, 1000 * (index + 1))
    );

    timersRef.current[previewId] = timers;
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

        <div className="mt-8">
          <SolverTrustRow />
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
          {solverMatrixPreviews.map((preview) => {
            const state = cardState[preview.id];

            return (
              <SolverPreviewCard
                key={preview.id}
                preview={preview}
                uploaded={state.uploaded}
                phase={state.phase}
                onUpload={() => handleUpload(preview.id)}
                onAnalyze={() => handleAnalyze(preview.id)}
              />
            );
          })}
        </div>

        <SolverDisclaimer />
      </div>
    </section>
  );
}
