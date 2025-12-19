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
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-primary">Application Progress</h3>
        <span className="text-2xl font-bold text-accent">{progress}%</span>
      </div>

      {/* Main progress bar */}
      <div className="relative mb-8">
        <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-700 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between mt-1 text-xs text-muted">
          <span>Start</span>
          <span>Complete</span>
        </div>
      </div>

      {/* Current stage highlight */}
      {currentStageData && showDetails && (
        <div className="bg-gradient-to-r from-primary to-primary-light rounded-xl p-6 text-white mb-8 shadow-lg">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-accent text-primary-dark text-xs font-bold px-2 py-1 rounded">
              STEP {currentStage} OF {STAGES.length}
            </span>
            {currentStage === STAGES.length && (
              <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
                COMPLETE
              </span>
            )}
          </div>
          <h4 className="text-2xl font-bold mb-2">{currentStageData.name}</h4>
          <p className="text-blue-100 text-sm">{currentStageData.description}</p>
        </div>
      )}

      {/* Stage timeline */}
      <div className="space-y-1">
        <h4 className="text-sm font-semibold text-muted uppercase tracking-wide mb-4">
          All Stages
        </h4>
        <div className="grid gap-2">
          {STAGES.map((stage) => {
            const isCompleted = stage.id < currentStage;
            const isCurrent = stage.id === currentStage;
            const isPending = stage.id > currentStage;

            return (
              <div
                key={stage.id}
                className={`
                  flex items-center gap-3 p-3 rounded-lg transition-all
                  ${isCurrent ? "bg-accent/10 border-2 border-accent" : ""}
                  ${isCompleted ? "bg-green-50" : ""}
                  ${isPending ? "bg-gray-50" : ""}
                `}
              >
                {/* Status indicator */}
                <div
                  className={`
                    w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0
                    ${isCompleted ? "bg-green-500 text-white" : ""}
                    ${isCurrent ? "bg-accent text-white" : ""}
                    ${isPending ? "bg-gray-300 text-gray-600" : ""}
                  `}
                >
                  {isCompleted ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    stage.id
                  )}
                </div>

                {/* Stage info */}
                <div className="flex-1 min-w-0">
                  <p
                    className={`
                      font-medium truncate
                      ${isCompleted ? "text-green-700" : ""}
                      ${isCurrent ? "text-primary font-semibold" : ""}
                      ${isPending ? "text-gray-500" : ""}
                    `}
                  >
                    {stage.name}
                  </p>
                </div>

                {/* Status badge */}
                <div className="flex-shrink-0">
                  {isCompleted && (
                    <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded">
                      Done
                    </span>
                  )}
                  {isCurrent && (
                    <span className="text-xs font-medium text-accent bg-accent/20 px-2 py-1 rounded">
                      Current
                    </span>
                  )}
                  {isPending && (
                    <span className="text-xs font-medium text-gray-400 bg-gray-100 px-2 py-1 rounded">
                      Pending
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
