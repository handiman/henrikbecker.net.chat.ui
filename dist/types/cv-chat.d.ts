export declare class CvChat {
    question: string;
    answer: string;
    confidence: string;
    promptGuard: string;
    chunks: string[];
    loading: boolean;
    examples: string[];
    handleAsk(): Promise<void>;
    private logDebug;
    private extractResponseType;
    private handleKeyDown;
    render(): any;
}
