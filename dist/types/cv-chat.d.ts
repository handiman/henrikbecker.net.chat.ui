export declare class CvChat {
    collection: string;
    placeholder: string;
    error: string;
    question: string;
    answer: string;
    chunks: string[];
    loading: boolean;
    minimized: boolean;
    handleAsk(): Promise<void>;
    private logDebug;
    private handleKeyDown;
    toggleMinimize(): void;
    render(): any;
}
