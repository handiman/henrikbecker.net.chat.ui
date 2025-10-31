import { r as registerInstance, h } from './index-B_wcSKyM.js';

const cvChatCss = ":host{display:block;font-family:system-ui, sans-serif;max-width:600px;margin:2rem auto;padding:1rem;box-sizing:border-box;--chat-accent:#333;--chat-accent-hover:#555;--chat-bg:#f9f9f9;--chat-border:#ccc;--chat-radius:4px;--chat-font-size:1rem}.input-wrapper{display:flex;align-items:center;gap:0.5rem}input[part=\"input\"]{flex:1;padding:0.5rem 0.75rem;font-size:var(--chat-font-size);border:1px solid var(--chat-border);border-radius:var(--chat-radius)}button.ask-button{background:var(--chat-accent);color:white;border:none;border-radius:var(--chat-radius);font-size:1.2rem;padding:0.4rem 0.6rem;cursor:pointer;transition:background 0.2s ease}button.ask-button:hover{background:var(--chat-accent-hover)}button.ask-button:disabled{opacity:0.5;cursor:not-allowed}[part=\"response\"]{margin-top:1rem;padding:0.75rem;background:var(--chat-bg);border-left:4px solid var(--chat-accent);border-radius:var(--chat-radius)}.confidence{display:inline-block;margin-top:0.5rem;font-size:0.85rem;font-weight:bold;padding:0.2rem 0.4rem;border-radius:3px;background:#eee}.confidence.faktabaserat{background:#d0f0d0;color:#2b7a2b}.confidence.tolkning{background:#fdf0c0;color:#a67c00}.confidence.kreativ{background:#f0d0f0;color:#7a2b7a}.spinner{display:inline-block;width:1.2rem;height:1.2rem;animation:spin 0.8s linear infinite}button img{width:16px;height:16px}@keyframes spin{to{transform:rotate(360deg)}}";

const CvChat = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.collection = '';
        this.placeholder = 'Ask my CV bot anything...';
        this.error = 'Something went wrong while contacting my brain.';
        this.question = '';
        this.answer = '';
        this.confidence = '';
        this.promptGuard = '';
        this.chunks = [];
        this.loading = false;
    }
    async handleAsk() {
        if (!this.question.trim())
            return;
        this.loading = true;
        this.answer = '';
        this.confidence = '';
        this.promptGuard = '';
        this.chunks = [];
        try {
            const response = await fetch('https://henrikbecker.azurewebsites.net/ai/ingest/' + this.collection, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(this.question)
            });
            const data = await response.json();
            this.answer = data.answer;
            this.confidence = data.confidence;
            this.promptGuard = data.promptGuard;
            this.chunks = data.chunks;
            this.logDebug(this.question, data);
        }
        catch (error) {
            this.answer = error + " " + this.error;
        }
        this.loading = false;
    }
    logDebug(question, data) {
        console.groupCollapsed(`💬 ${question}`);
        console.log('🧩 PromptGuard:', data.promptGuard);
        console.log('📚 Chunks:', data.chunks);
        console.log('🎯 Confidence:', data.confidence);
        console.log('🧠 Response Type:', this.extractResponseType(data.answer));
        console.log('🧠 Original Question:', question);
        console.groupEnd();
    }
    extractResponseType(answer) {
        if (answer.includes('Faktabaserat'))
            return 'Faktabaserat';
        if (answer.includes('Tolkning'))
            return 'Tolkning';
        if (answer.includes('Kreativ'))
            return 'Kreativ extrapolering';
        return 'Okänt';
    }
    handleKeyDown(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            this.handleAsk();
        }
    }
    render() {
        return (h("div", { key: 'e616e4da5d4dc5ddf3d49f461a88ed08e831e069', part: "container" }, h("div", { key: 'c9edcda4234c3b0bbaf82809ea485e2571426a7e', class: "input-wrapper" }, h("input", { key: '016af5db79a3a2ae95edc25abd816b48a1db25f4', id: "question", part: "input", type: "text", value: this.question, onInput: e => this.question = e.target.value, onKeyDown: e => this.handleKeyDown(e), placeholder: this.placeholder }), h("button", { key: '870bd903e7573c54d3c2676256a7bfbe3bbde173', part: "icon-button", class: "ask-button", onClick: () => this.handleAsk(), disabled: this.loading, title: "Ask" }, this.loading ? (h("img", { src: "/favicon.ico", class: "spinner" })) : (h("img", { src: "/favicon.ico" })))), this.answer && (h("div", { key: 'bd7af4f888dbfad337e58a790b359aa90239ce79', part: "response" }, h("p", { key: '486c754bd43099a753a3a339725f5019c5e6265a' }, this.answer), h("span", { key: '87a5db38f2179eb7ed01b8f3e2f4a5f5f60c72f6', part: "confidence", class: `confidence ${this.confidence.toLowerCase()}` }, this.confidence)))));
    }
};
CvChat.style = cvChatCss;

export { CvChat as cv_chat };
//# sourceMappingURL=cv-chat.entry.js.map
