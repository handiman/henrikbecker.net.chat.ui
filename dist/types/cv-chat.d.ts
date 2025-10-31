export declare class CvChat {
    collection: string;
    placeholder: string;
    error: string;
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
