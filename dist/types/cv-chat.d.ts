export declare class CvChat {
    collection: string;
    /** Base URL of the ask endpoint; the collection name is appended. */
    endpoint: string;
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
    private inputEl?;
    /** Puts the cursor in the question box. */
    focusInput(): Promise<void>;
    /** Asks a question as if the visitor had typed it and pressed Enter. */
    ask(question: string): Promise<void>;
    handleAsk(): Promise<void>;
    private startSpinner;
    private stopSpinner;
    disconnectedCallback(): void;
    private logDebug;
    private handleKeyDown;
    toggleMinimize(): void;
    render(): any;
}
