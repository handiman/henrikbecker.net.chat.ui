export declare class CvChat {
    ingestEndpoint: string;
    questionPlaceholder: string;
    errorMessage: string;
    question: string;
    answer: string;
    confidence: string;
    promptGuard: string;
    chunks: string[];
    loading: boolean;
    handleAsk(): Promise<void>;
    private logDebug;
    private extractResponseType;
    private handleKeyDown;
    render(): any;
}
