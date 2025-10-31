import { r as registerInstance, h } from './index-B_wcSKyM.js';

const cvChatCss = ":host{display:block;font-family:system-ui, sans-serif;max-width:600px;margin:2rem auto;padding:1rem;box-sizing:border-box;--chat-accent:#333;--chat-accent-hover:#555;--chat-bg:#f9f9f9;--chat-border:#ccc;--chat-radius:4px;--chat-font-size:1rem}.input-wrapper{display:flex;align-items:center;gap:0.5rem}input[part=\"input\"]{flex:1;padding:0.5rem 0.75rem;font-size:var(--chat-font-size);border:1px solid var(--chat-border);border-radius:var(--chat-radius)}button.ask-button{background:var(--chat-accent);color:white;border:none;border-radius:var(--chat-radius);font-size:1.2rem;padding:0.4rem 0.6rem;cursor:pointer;transition:background 0.2s ease}button.ask-button:hover{background:var(--chat-accent-hover)}button.ask-button:disabled{opacity:0.5;cursor:not-allowed}[part=\"response\"]{margin-top:1rem;padding:0.75rem;background:var(--chat-bg);border-left:4px solid var(--chat-accent);border-radius:var(--chat-radius)}.confidence{display:inline-block;margin-top:0.5rem;font-size:0.85rem;font-weight:bold;padding:0.2rem 0.4rem;border-radius:3px;background:#eee}.confidence.faktabaserat{background:#d0f0d0;color:#2b7a2b}.confidence.tolkning{background:#fdf0c0;color:#a67c00}.confidence.kreativ{background:#f0d0f0;color:#7a2b7a}.spinner{display:inline-block;width:1.2rem;height:1.2rem;border:2px solid white;border-top:2px solid transparent;border-radius:50%;animation:spin 0.8s linear infinite}@keyframes spin{to{transform:rotate(360deg)}}";

const CvChat = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.ingestEndpoint = 'https://henrikbecker.azurewebsites.net/ai/ingest/henrik-becker';
        this.questionPlaceholder = 'Ask Henrik\'s CV bot anything...';
        this.errorMessage = 'Something went wrong while contacting Henrik´\'s brain.';
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
            const response = await fetch(this.ingestEndpoint, {
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
            this.answer = error + " " + this.errorMessage;
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
        return (h("div", { key: '2620ca422b38a5a3cb9a7ca368e0836c8b34b57c', part: "container" }, h("div", { key: 'deaa2247b35066de8cf78f1c10492415ebd9d6d6', class: "input-wrapper" }, h("input", { key: 'ce6249f9fe07a85d57a4747839a8b16d4b8d0a08', id: "question", part: "input", type: "text", value: this.question, onInput: e => this.question = e.target.value, onKeyDown: e => this.handleKeyDown(e), placeholder: this.questionPlaceholder }), h("button", { key: '39bcf980f700109606e4dd84dfee5baafaf995e9', part: "icon-button", class: "ask-button", onClick: () => this.handleAsk(), disabled: this.loading, title: "Ask" }, this.loading ? h("span", { class: "spinner" }) : '🤖')), this.answer && (h("div", { key: '7cd49eecd0200ccf07f74c53ad46bdefc37ee905', part: "response" }, h("p", { key: 'd271e82fd3f6e42d078b178716bc27f3030ecc6d' }, this.answer), h("span", { key: '4ca30db4960c57bd8efad02f84e68394f7de0063', part: "confidence", class: `confidence ${this.confidence.toLowerCase()}` }, this.confidence)))));
    }
};
CvChat.style = cvChatCss;

export { CvChat as cv_chat };
//# sourceMappingURL=cv-chat.entry.js.map
