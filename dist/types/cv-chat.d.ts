export declare class CvChat {
    collection: string;
    placeholder: string;
    error: string;
    question: string;
    answer: string;
    chunks: string[];
    loading: boolean;
    minimized: boolean;
    spinnerFrame: string;
    private static spinnerFrames;
    private spinnerIndex;
    private spinnerTimer?;
    handleAsk(): Promise<void>;
    private startSpinner;
    private stopSpinner;
    disconnectedCallback(): void;
    private logDebug;
    private handleKeyDown;
    toggleMinimize(): void;
    render(): any;
}
