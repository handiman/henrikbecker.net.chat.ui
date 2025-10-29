'use strict';

var index = require('./index-B5NDlE4k.js');

const cvChatCss = ":host{display:block;font-family:system-ui, sans-serif;max-width:600px;margin:2rem auto;padding:1rem;box-sizing:border-box;--chat-accent:#333;--chat-accent-hover:#555;--chat-bg:#f9f9f9;--chat-border:#ccc;--chat-radius:4px;--chat-font-size:1rem}.input-wrapper{display:flex;align-items:center;gap:0.5rem}input[part=\"input\"]{flex:1;padding:0.5rem 0.75rem;font-size:var(--chat-font-size);border:1px solid var(--chat-border);border-radius:var(--chat-radius)}button.ask-button{background:var(--chat-accent);color:white;border:none;border-radius:var(--chat-radius);font-size:1.2rem;padding:0.4rem 0.6rem;cursor:pointer;transition:background 0.2s ease}button.ask-button:hover{background:var(--chat-accent-hover)}button.ask-button:disabled{opacity:0.5;cursor:not-allowed}[part=\"response\"]{margin-top:1rem;padding:0.75rem;background:var(--chat-bg);border-left:4px solid var(--chat-accent);border-radius:var(--chat-radius)}.confidence{display:inline-block;margin-top:0.5rem;font-size:0.85rem;font-weight:bold;padding:0.2rem 0.4rem;border-radius:3px;background:#eee}.confidence.faktabaserat{background:#d0f0d0;color:#2b7a2b}.confidence.tolkning{background:#fdf0c0;color:#a67c00}.confidence.kreativ{background:#f0d0f0;color:#7a2b7a}.spinner{display:inline-block;width:1.2rem;height:1.2rem;border:2px solid white;border-top:2px solid transparent;border-radius:50%;animation:spin 0.8s linear infinite}@keyframes spin{to{transform:rotate(360deg)}}";

const CvChat = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.question = '';
        this.answer = '';
        this.confidence = '';
        this.promptGuard = '';
        this.chunks = [];
        this.loading = false;
        this.examples = [
            "What has Henrik done in .NET?",
            "Has he worked with automation?",
            "What's his philosophy on AI?"
        ];
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
            const response = await fetch('https://henrikbecker.azurewebsites.net/ai/ask', {
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
            this.answer = error + " Something went wrong while contacting Henrik's brain.";
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
        return (index.h("div", { key: 'be7c4b793799de7e0f67ef86427f9ce99f988fac', part: "container" }, index.h("div", { key: '4c0546fdc567a958267fe930bd5c5bf84dede4f8', class: "input-wrapper" }, index.h("input", { key: 'e8fb7df6c6aa689671196f45f702d1dd231dbaaa', id: "question", part: "input", type: "text", value: this.question, onInput: e => this.question = e.target.value, onKeyDown: e => this.handleKeyDown(e), placeholder: "Ask Henrik's CV bot anything..." }), index.h("button", { key: '6a60a56fd378626f52d9a77de639fece4a765ba3', part: "icon-button", class: "ask-button", onClick: () => this.handleAsk(), disabled: this.loading, title: "Ask" }, this.loading ? index.h("span", { class: "spinner" }) : '🤖')), false, this.answer && (index.h("div", { key: '265fddf2560ce96b0a636320e9d3bfbf172df5af', part: "response" }, index.h("p", { key: 'd98a0ef5e594123401fa446bb0764631162443de' }, this.answer), index.h("span", { key: 'a99ab1e4df172b568c25619756eae4745f88f177', part: "confidence", class: `confidence ${this.confidence.toLowerCase()}` }, this.confidence)))));
    }
};
CvChat.style = cvChatCss;

exports.cv_chat = CvChat;
//# sourceMappingURL=cv-chat.entry.cjs.js.map
