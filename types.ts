
export enum Sentiment {
    Positive = 'Positive',
    Negative = 'Negative',
    Neutral = 'Neutral',
}

export interface AnalysisResult {
    sentiment: Sentiment;
    sentimentScore: number;
    summary: string;
    keyThemes: string[];
}
