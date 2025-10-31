import { r as registerInstance, h } from './index-B_wcSKyM.js';

const cvChatCss = ":host{display:block;font-family:system-ui, sans-serif;position:relative;z-index:1000;--chat-bg:#ffffff;--chat-text:#333333;--chat-accent:#26a69a;--chat-shadow:0 2px 8px rgba(0, 0, 0, 0.2);--chat-radius:6px;--confidence-high-bg:#e0f8e9;--confidence-high-text:#2e7d32;--confidence-medium-bg:#fff8e1;--confidence-medium-text:#f9a825;--confidence-low-bg:#ffebee;--confidence-low-text:#c62828}.input-wrapper{position:relative;display:flex;align-items:center;background:var(--chat-bg);border-radius:var(--chat-radius);padding:0.3rem 0.5rem;box-shadow:0 1px 3px rgba(0, 0, 0, 0.1);min-width:240px}input[part=\"input\"]{flex:1;border:none;outline:none;font-size:0.9rem;padding:0.4rem;background:transparent;color:var(--chat-text)}.ask-button{background:none;border:none;cursor:pointer;padding:0.3rem}.ask-button img{width:20px;height:20px}.spinner{animation:spin 1s linear infinite}@keyframes spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}[part=\"response\"]{position:absolute;top:calc(100% + 4px);right:0;background:var(--chat-bg);box-shadow:var(--chat-shadow);border-radius:var(--chat-radius);padding:0.75rem;min-width:280px;max-width:400px;z-index:9999}[part=\"response\"] p{margin:0 0 0.5rem 0;font-size:0.85rem;color:var(--chat-text)}.confidence{font-size:0.75rem;font-weight:bold;text-transform:uppercase;padding:0.2rem 0.4rem;border-radius:4px}.confidence.high{background:var(--confidence-high-bg);color:var(--confidence-high-text)}.confidence.medium{background:var(--confidence-medium-bg);color:var(--confidence-medium-text)}.confidence.low{background:var(--confidence-low-bg);color:var(--confidence-low-text)}@media (max-width: 600px){.input-wrapper{min-width:100%}[part=\"response\"]{max-width:100%;right:auto;left:0}}button img{width:16px;height:16px}";

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
        this.minimized = false;
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
            const response = await fetch('https://henrikbecker.azurewebsites.net/ai/ask/' + this.collection, {
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
        this.minimized = false;
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
    toggleMinimize() {
        this.minimized = !this.minimized;
    }
    render() {
        return (h("div", { key: '750267cf852ef6a4efe238ff8141e85f5a1fa2b8', part: "container" }, h("div", { key: '8e45f10f829499dbea9e7e8fc1560eb024d7aab1', class: "input-wrapper" }, h("input", { key: 'e757ba7225f83e8004bd27e7fa92ceff9e25aa4b', id: "question", part: "input", type: "text", value: this.question, onInput: e => this.question = e.target.value, onKeyDown: e => this.handleKeyDown(e), placeholder: this.placeholder }), h("button", { key: '54f62175aebe6aea4060a0e48f79e9f3ae1cfc52', part: "icon-button", class: "ask-button", onClick: () => this.handleAsk(), disabled: this.loading, title: "Ask" }, this.loading ? (h("img", { src: "/favicon.ico", class: "spinner" })) : (h("img", { src: "/favicon.ico" })))), !this.minimized && this.answer && (h("div", { key: '1768982e981a059ec20cfd0ac0cd3d3d967945b9', part: "response" }, h("p", { key: '6586be440f1be115a405d656f7e606e67ee33b7d' }, this.answer), h("span", { key: '3ed541eb7f546610f91158755d2d85785d3595e6', part: "confidence", class: `confidence ${this.confidence.toLowerCase()}` }, this.confidence)))));
    }
};
CvChat.style = cvChatCss;

export { CvChat as cv_chat };
//# sourceMappingURL=cv-chat.entry.js.map
