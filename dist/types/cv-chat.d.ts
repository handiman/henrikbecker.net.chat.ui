export declare class CvChat {
    question: string;
    answer: string;
    confidence: string;
    promptGuard: string;
    chunks: string[];
    loading: boolean;
    showMeta: boolean;
    history: {
        question: string;
        answer: string;
    }[];
    examples: string[];
    handleAsk(): Promise<void>;
    render(): any;
}
