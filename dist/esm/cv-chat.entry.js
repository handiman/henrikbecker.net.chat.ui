import { r as registerInstance, h, g as getElement } from './index-Dyl2uF-5.js';

const cvChatCss = ":host{display:block;position:relative;font-family:system-ui, sans-serif;z-index:1000;--chat-bg:#ffffff;--chat-text:#333333;--chat-accent:#26a69a;--chat-shadow:0 2px 8px rgba(0, 0, 0, 0.2);--chat-radius:6px;--confidence-high-bg:#e0f8e9;--confidence-high-text:#2e7d32;--confidence-medium-bg:#fff8e1;--confidence-medium-text:#f9a825;--confidence-low-bg:#ffebee;--confidence-low-text:#c62828}.input-wrapper{position:relative;display:flex;align-items:center;background:var(--chat-bg);border-radius:var(--chat-radius);padding:0.3rem 0.5rem;box-shadow:0 1px 3px rgba(0, 0, 0, 0.1);min-width:240px}input[part=\"input\"]{flex:1;border:none;outline:none;font-size:0.9rem;padding:0.4rem;background:transparent;color:var(--chat-text)}.ask-button{background:none;border:none;cursor:pointer;padding:0.3rem}.ask-button img{width:20px;height:20px}.spinner{animation:spin 1s linear infinite}@keyframes spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}.response-box{position:absolute;top:calc(100% + 4px);left:0;background:var(--chat-bg);box-shadow:var(--chat-shadow);border-radius:var(--chat-radius);padding:1rem 1rem 2.5rem 1rem;min-width:280px;max-width:400px;z-index:9999;font-size:0.85rem;color:var(--chat-text)}.response-box p{margin:0 0 0.5rem 0}.confidence{position:absolute;bottom:8px;left:12px;font-size:0.75rem;font-weight:bold;text-transform:uppercase;padding:0.2rem 0.4rem;border-radius:4px}.confidence.high{background:var(--confidence-high-bg);color:var(--confidence-high-text)}.confidence.medium{background:var(--confidence-medium-bg);color:var(--confidence-medium-text)}.confidence.low{background:var(--confidence-low-bg);color:var(--confidence-low-text)}.close-button{position:absolute;bottom:8px;right:12px;background:none;border:none;font-size:1.2rem;color:#888;cursor:pointer;line-height:1}@media (max-width: 600px){.input-wrapper{min-width:100%}.response-box{max-width:100%;left:0;right:auto}}button img{width:16px;height:16px}";

const CvChat = class {
    componentDidLoad() {
        document.addEventListener('click', this.handleClickOutside);
    }
    disconnectedCallback() {
        document.removeEventListener('click', this.handleClickOutside);
    }
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
        this.handleClickOutside = (event) => {
            const host = this.el.shadowRoot || this.el;
            if (!host.contains(event.target)) {
                this.minimized = true;
            }
        };
        this.el = document.createElement('div');
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
        return (h("div", { key: '38b7f1330f7a890ea9aa0ffed3a9984c1a9031c4', part: "container" }, h("div", { key: 'ad906c71cd08c4e6c3ae12ecf0e6a2cecda6503d', class: "input-wrapper" }, h("input", { key: '9a22295c26979aebccf1f6615ca544093b2db7fe', id: "question", part: "input", type: "text", value: this.question, onInput: e => this.question = e.target.value, onKeyDown: e => this.handleKeyDown(e), placeholder: this.placeholder }), h("button", { key: '054735de49c11b1e1eb364aa0e4a2f50ac7113a6', part: "icon-button", class: "ask-button", onClick: () => this.handleAsk(), disabled: this.loading, title: "Ask" }, this.loading ? (h("img", { src: "/favicon.ico", class: "spinner" })) : (h("img", { src: "/favicon.ico" })))), !this.minimized && this.answer && (h("div", { key: '7b74014c633b36065e7dbcf5effb57f57e9ba972', part: "response", class: "response-box" }, h("p", { key: 'e2800d98fb99533f12d9455cc6e60f07681dbfd2' }, this.answer), h("span", { key: '64c036f7d388d4afed5cbbc47fd92bf8350f3e24', part: "confidence", class: `confidence ${this.confidence.toLowerCase()}` }, this.confidence), h("button", { key: 'b769b635a2876fe62ea9dae5047ad23313ce5dd0', class: "close-button", onClick: () => this.minimized = true, title: "St\u00E4ng" }, "\u00D7")))));
    }
    get el() { return getElement(this); }
};
CvChat.style = cvChatCss;

export { CvChat as cv_chat };
//# sourceMappingURL=cv-chat.entry.js.map
