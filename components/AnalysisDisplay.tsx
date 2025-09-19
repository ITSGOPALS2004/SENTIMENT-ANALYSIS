
import React from 'react';
import type { AnalysisResult } from '../types';
import { Sentiment } from '../types';
import SentimentIcon from './SentimentIcon';

interface AnalysisDisplayProps {
    result: AnalysisResult;
    onReset: () => void;
}

const sentimentConfig = {
    [Sentiment.Positive]: {
        color: 'text-green-400',
        bgColor: 'bg-green-500/10',
        borderColor: 'border-green-500/30',
        progressColor: 'bg-green-500'
    },
    [Sentiment.Negative]: {
        color: 'text-red-400',
        bgColor: 'bg-red-500/10',
        borderColor: 'border-red-500/30',
        progressColor: 'bg-red-500'
    },
    [Sentiment.Neutral]: {
        color: 'text-yellow-400',
        bgColor: 'bg-yellow-500/10',
        borderColor: 'border-yellow-500/30',
        progressColor: 'bg-yellow-500'
    }
};

const ScoreBar: React.FC<{ score: number, color: string }> = ({ score, color }) => {
    const percentage = ((score + 1) / 2) * 100;
    return (
        <div className="w-full bg-gray-700 rounded-full h-2.5">
            <div className={`${color} h-2.5 rounded-full`} style={{ width: `${percentage}%` }}></div>
        </div>
    );
};

const AnalysisDisplay: React.FC<AnalysisDisplayProps> = ({ result, onReset }) => {
    const config = sentimentConfig[result.sentiment];

    return (
        <div className={`p-6 rounded-lg border ${config.borderColor} ${config.bgColor} animate-fade-in`}>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center space-x-4">
                    <SentimentIcon sentiment={result.sentiment} />
                    <div>
                        <p className="text-sm text-gray-400">Overall Sentiment</p>
                        <h2 className={`text-3xl font-bold ${config.color}`}>{result.sentiment}</h2>
                    </div>
                </div>
                <button 
                    onClick={onReset}
                    className="mt-4 sm:mt-0 px-4 py-2 bg-gray-700 text-gray-300 text-sm font-semibold rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500 transition-colors"
                >
                    Analyze New Feedback
                </button>
            </div>

            <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-200 mb-2">Sentiment Score: {result.sentimentScore.toFixed(2)}</h3>
                <ScoreBar score={result.sentimentScore} color={config.progressColor} />
            </div>

            <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-200 mb-2">Summary</h3>
                <p className="text-gray-300 italic">"{result.summary}"</p>
            </div>

            <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-200 mb-3">Key Themes</h3>
                <div className="flex flex-wrap gap-2">
                    {result.keyThemes.length > 0 ? (
                        result.keyThemes.map((theme, index) => (
                            <span key={index} className="px-3 py-1 bg-gray-700 text-cyan-300 text-sm font-medium rounded-full">
                                {theme}
                            </span>
                        ))
                    ) : (
                        <p className="text-gray-400 text-sm">No specific themes were identified.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AnalysisDisplay;
