"use client";

import { STAGES, getProgressPercentage } from "@/lib/stages";

interface ProgressBarProps {
  currentStage: number;
  showDetails?: boolean;
}

export default function ProgressBar({ currentStage, showDetails = true }: ProgressBarProps) {
  const progress = getProgressPercentage(currentStage);
  const currentStageData = STAGES.find((s) => s.id === currentStage);

  return (
    <div className="w-full">
      {/* Progress percentage header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-semibold text-text-primary">Application Progress</h3>
          <p className="text-sm text-text-tertiary mt-0.5">Track your journey to completion</p>
        </div>
        <div className="text-right">
          <span className="text-3xl font-bold text-accent tabular-nums">{progress}%</span>
          <p className="text-xs text-text-muted">Complete</p>
        </div>
      </div>

      {/* Main progress bar */}
      <div className="relative mb-8">
        <div className="h-2 bg-bg-tertiary rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-accent to-accent-secondary rounded-full transition-all duration-700 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Current stage highlight */}
      {currentStageData && showDetails && (
        <div className="relative overflow-hidden rounded-xl border border-border-primary bg-bg-secondary p-6 mb-8">
          <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="relative">
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-accent-muted text-accent border border-accent/20">
                STEP {currentStage} OF {STAGES.length}
              </span>
              {currentStage === STAGES.length && (
                <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-success-muted text-success border border-success/20">
                  COMPLETE
                </span>
              )}
            </div>
            <h4 className="text-xl font-semibold text-text-primary mb-2">{currentStageData.name}</h4>
            <p className="text-sm text-text-secondary">{currentStageData.description}</p>
          </div>
        </div>
      )}

      {/* Stage timeline */}
      <div className="space-y-1">
        <h4 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-4">
          All Stages
        </h4>
        <div className="space-y-1">
          {STAGES.map((stage) => {
            const isCompleted = stage.id < currentStage;
            const isCurrent = stage.id === currentStage;
            const isPending = stage.id > currentStage;

            return (
              <div
                key={stage.id}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all
                  ${isCurrent ? "bg-accent-muted border border-accent/20" : ""}
                  ${isCompleted ? "bg-success-muted/50" : ""}
                  ${isPending ? "opacity-50" : ""}
                `}
              >
                {/* Status indicator */}
                <div
                  className={`
                    w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0
                    ${isCompleted ? "bg-success text-btn-text" : ""}
                    ${isCurrent ? "bg-accent text-btn-text" : ""}
                    ${isPending ? "bg-bg-tertiary text-text-muted border border-border-primary" : ""}
                  `}
                >
                  {isCompleted ? (
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <span className="text-[10px]">{stage.id}</span>
                  )}
                </div>

                {/* Stage info */}
                <div className="flex-1 min-w-0">
                  <p
                    className={`
                      text-sm font-medium truncate
                      ${isCompleted ? "text-success" : ""}
                      ${isCurrent ? "text-accent" : ""}
                      ${isPending ? "text-text-muted" : ""}
                    `}
                  >
                    {stage.name}
                  </p>
                </div>

                {/* Status badge */}
                <div className="flex-shrink-0">
                  {isCompleted && (
                    <span className="text-[10px] font-medium text-success uppercase tracking-wide">
                      Done
                    </span>
                  )}
                  {isCurrent && (
                    <span className="text-[10px] font-medium text-accent uppercase tracking-wide">
                      Current
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
