
import React, { useState, useCallback } from 'react';
import type { AnalysisResult } from './types';
import { analyzeSentiment } from './services/geminiService';
import Header from './components/Header';
import FeedbackForm from './components/FeedbackForm';
import AnalysisDisplay from './components/AnalysisDisplay';
import Loader from './components/Loader';
import ErrorMessage from './components/ErrorMessage';
import Welcome from './components/Welcome';

const App: React.FC = () => {
    const [feedback, setFeedback] = useState<string>('');
    const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleAnalysis = useCallback(async () => {
        if (!feedback.trim()) {
            setError('Please enter some feedback to analyze.');
            return;
        }
        setIsLoading(true);
        setError(null);
        setAnalysis(null);

        try {
            const result = await analyzeSentiment(feedback);
            setAnalysis(result);
        } catch (err) {
            console.error(err);
            setError(err instanceof Error ? err.message : 'An unknown error occurred during analysis.');
        } finally {
            setIsLoading(false);
        }
    }, [feedback]);

    const handleReset = () => {
        setFeedback('');
        setAnalysis(null);
        setError(null);
        setIsLoading(false);
    };

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 font-sans flex flex-col items-center p-4 sm:p-6 lg:p-8">
            <div className="w-full max-w-4xl mx-auto">
                <Header />
                <main className="mt-8">
                    <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-2xl shadow-indigo-900/20 border border-gray-700 p-6 sm:p-8">
                        <FeedbackForm 
                            feedback={feedback}
                            setFeedback={setFeedback}
                            onAnalyze={handleAnalysis}
                            isLoading={isLoading}
                        />
                        <div className="mt-8 min-h-[300px]">
                           {isLoading && <Loader />}
                           {error && <ErrorMessage message={error} />}
                           {analysis && !isLoading && <AnalysisDisplay result={analysis} onReset={handleReset} />}
                           {!isLoading && !error && !analysis && <Welcome />}
                        </div>
                    </div>
                </main>
                <footer className="text-center mt-12 text-gray-500 text-sm">
                    <p>Powered by Gemini API. Built with React & Tailwind CSS.</p>
                </footer>
            </div>
        </div>
    );
};

export default App;
