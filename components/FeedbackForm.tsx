
import React from 'react';

interface FeedbackFormProps {
    feedback: string;
    setFeedback: (value: string) => void;
    onAnalyze: () => void;
    isLoading: boolean;
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({ feedback, setFeedback, onAnalyze, isLoading }) => {
    return (
        <div>
            <label htmlFor="feedback-input" className="block text-sm font-medium text-gray-300 mb-2">
                Paste customer feedback below:
            </label>
            <textarea
                id="feedback-input"
                rows={8}
                className="w-full p-4 bg-gray-900 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow duration-200 text-gray-200 placeholder-gray-500 resize-none"
                placeholder="e.g., 'The checkout process was seamless and the product arrived faster than expected! Excellent service.'"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                disabled={isLoading}
            />
            <div className="mt-4 flex justify-end">
                <button
                    onClick={onAnalyze}
                    disabled={isLoading || !feedback.trim()}
                    className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 disabled:bg-indigo-900/50 disabled:cursor-not-allowed disabled:text-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500 transition-all duration-200 transform hover:scale-105"
                >
                    {isLoading ? 'Analyzing...' : 'Analyze Sentiment'}
                </button>
            </div>
        </div>
    );
};

export default FeedbackForm;
