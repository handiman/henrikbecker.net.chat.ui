import { r as registerInstance, h } from './index-B_wcSKyM.js';

const cvChatCss = ":host{display:block;font-family:system-ui, sans-serif;max-width:600px;margin:2rem auto;padding:1rem;box-sizing:border-box;--chat-accent:#333;--chat-accent-hover:#555;--chat-bg:#f9f9f9;--chat-border:#ccc;--chat-radius:4px;--chat-font-size:1rem}.input-wrapper{display:flex;align-items:center;gap:0.5rem}input[part=\"input\"]{flex:1;padding:0.5rem 0.75rem;font-size:var(--chat-font-size);border:1px solid var(--chat-border);border-radius:var(--chat-radius)}button.ask-button{background:var(--chat-accent);color:white;border:none;border-radius:var(--chat-radius);font-size:1.2rem;padding:0.4rem 0.6rem;cursor:pointer;transition:background 0.2s ease}button.ask-button:hover{background:var(--chat-accent-hover)}button.ask-button:disabled{opacity:0.5;cursor:not-allowed}[part=\"response\"]{margin-top:1rem;padding:0.75rem;background:var(--chat-bg);border-left:4px solid var(--chat-accent);border-radius:var(--chat-radius)}.confidence{display:inline-block;margin-top:0.5rem;font-size:0.85rem;font-weight:bold;padding:0.2rem 0.4rem;border-radius:3px;background:#eee}.confidence.faktabaserat{background:#d0f0d0;color:#2b7a2b}.confidence.tolkning{background:#fdf0c0;color:#a67c00}.confidence.kreativ{background:#f0d0f0;color:#7a2b7a}.spinner{display:inline-block;width:1.2rem;height:1.2rem;animation:spin 0.8s linear infinite}button img{width:16px;height:16px}@keyframes spin{to{transform:rotate(360deg)}}";

const CvChat = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.collection = '';
        this.placeholder = 'Ask my CV bot anything...';
        this.error = 'Something went wrong while contacting my brain.';
        this.answerPosition = 'below';
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
        return (h("div", { key: 'e40d048fd505ae78bd8c5c087a1663f8a292aedc', part: "container" }, h("div", { key: '40d7643f66a4c771f4060103c8aea5a85257ce27', class: "chat-header" }, h("button", { key: 'b7a79c78e52f46c74a1d019af333479d773057f7', class: "minimize", onClick: () => this.toggleMinimize() }, this.minimized ? '▲' : '▼')), !this.minimized && this.answerPosition == 'above' && this.answer && (h("div", { key: 'c999edd159e8323a0c7d8a8b8e74eb3eaf83ad0a', part: "response" }, h("p", { key: '846ffb4a73321505bb0ceadfe99ebd8188daa810' }, this.answer), h("span", { key: '7c8427a5f85a2065659f7295b12b5a654104698a', part: "confidence", class: `confidence ${this.confidence.toLowerCase()}` }, this.confidence))), h("div", { key: 'd7e1da0dc02ca98f25a501a91372a04d2a78525a', class: "input-wrapper" }, h("input", { key: '098b43aac4df52260baf7842fae2b12dbd77cf1f', id: "question", part: "input", type: "text", value: this.question, onInput: e => this.question = e.target.value, onKeyDown: e => this.handleKeyDown(e), placeholder: this.placeholder }), h("button", { key: 'ac65744841459a3abc857d075d82256d8c1230b3', part: "icon-button", class: "ask-button", onClick: () => this.handleAsk(), disabled: this.loading, title: "Ask" }, this.loading ? (h("img", { src: "/favicon.ico", class: "spinner" })) : (h("img", { src: "/favicon.ico" })))), !this.minimized && this.answerPosition == 'below' && this.answer && (h("div", { key: '01eaf3eb4f22534dc10113dfc0613d78fecd9fcc', part: "response" }, h("p", { key: '4601c662bccc9e0f4ccee0e09bc59cafeb0c58ef' }, this.answer), h("span", { key: '1f2c61dd227f83c108a389d0349e6ec9ebe4ba9c', part: "confidence", class: `confidence ${this.confidence.toLowerCase()}` }, this.confidence)))));
    }
};
CvChat.style = cvChatCss;

export { CvChat as cv_chat };
//# sourceMappingURL=cv-chat.entry.js.map
