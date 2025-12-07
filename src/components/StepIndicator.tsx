'use client';

import React from 'react';
import { Check } from 'lucide-react';

interface StepIndicatorProps {
  currentStep: number;
  steps: string[];
}

export default function StepIndicator({ currentStep, steps }: StepIndicatorProps) {
  return (
    <div className="w-full py-6">
      <div className="flex items-center justify-center space-x-4">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isActive = currentStep === stepNumber;
          const isCompleted = currentStep > stepNumber;

          return (
            <div key={index} className="flex items-center">
              {/* Line */}
              {index > 0 && (
                <div className={`w-12 h-0.5 mx-4 hidden sm:block ${isCompleted ? 'bg-green-500' : 'bg-slate-200'}`} />
              )}
              
              <div className="flex items-center gap-2">
                <div 
                  className={`
                    w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-colors
                    ${isActive 
                      ? 'border-ci-blue bg-ci-blue text-white' 
                      : isCompleted 
                        ? 'border-green-500 bg-green-500 text-white' 
                        : 'border-slate-300 text-slate-400'
                    }
                  `}
                >
                  {isCompleted ? <Check className="w-4 h-4" /> : stepNumber}
                </div>
                <span 
                  className={`
                    text-sm font-medium hidden sm:block
                    ${isActive ? 'text-ci-blue' : isCompleted ? 'text-green-600' : 'text-slate-400'}
                  `}
                >
                  {step}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}


