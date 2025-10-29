'use strict';

var index = require('./index-B5NDlE4k.js');

const cvChatCss = ":host{--cvchat-bg:#ffffff;--cvchat-color:#333333;--cvchat-font:system-ui, sans-serif;--cvchat-border-radius:8px;--cvchat-button-bg:#0078d4;--cvchat-button-color:#ffffff;--cvchat-button-disabled-bg:#999999;--cvchat-example-bg:#eeeeee;--cvchat-response-bg:#f9f9f9;--cvchat-meta-bg:#eef;--cvchat-history-bg:#f4f4f4;display:block;background-color:var(--cvchat-bg);color:var(--cvchat-color);font-family:var(--cvchat-font);border-radius:var(--cvchat-border-radius);padding:1rem;box-sizing:border-box;max-width:600px;margin:auto}::part(label){font-weight:bold;display:block;margin-bottom:0.5rem}::part(input){width:100%;padding:0.5rem;margin-bottom:0.75rem;font-size:1rem;border:1px solid #aaa;border-radius:4px;box-sizing:border-box}::part(button){padding:0.5rem 1rem;font-size:1rem;background-color:var(--cvchat-button-bg);color:var(--cvchat-button-color);border:none;border-radius:4px;cursor:pointer;margin-top:0.25rem}::part(button:disabled){background-color:var(--cvchat-button-disabled-bg);cursor:wait}::part(examples){margin-top:1rem}::part(examples-label){font-weight:bold;margin-bottom:0.25rem}::part(example-button){background-color:var(--cvchat-example-bg);color:#333;border:1px solid #ccc;margin:0.25rem 0.25rem 0.25rem 0;font-size:0.9rem;padding:0.4rem 0.6rem;border-radius:4px;cursor:pointer}::part(response){margin-top:1.5rem;background:var(--cvchat-response-bg);padding:1rem;border-radius:6px;border-left:4px solid var(--cvchat-button-bg)}::part(confidence){display:inline-block;margin-top:0.5rem;font-size:0.85rem;padding:0.25rem 0.5rem;border-radius:4px;font-weight:bold}.confidence.factual{background-color:#d4edda;color:#155724}.confidence.interpretation{background-color:#fff3cd;color:#856404}.confidence.creative{background-color:#f8d7da;color:#721c24}::part(tone){margin-top:0.5rem;font-style:italic;color:#444}::part(meta-toggle){margin-top:0.75rem;background:none;border:none;color:var(--cvchat-button-bg);cursor:pointer;font-size:0.9rem;text-decoration:underline}::part(meta-info){margin-top:0.5rem;font-size:0.85rem;background:var(--cvchat-meta-bg);padding:0.5rem;border-radius:4px}::part(history){margin-top:2rem}::part(history) h4{margin-bottom:0.5rem}::part(history) ul{list-style:none;padding-left:0}::part(history) li{margin-bottom:1rem;background:var(--cvchat-history-bg);padding:0.75rem;border-radius:4px;font-size:0.9rem}@media (max-width: 480px){:host{padding:0.75rem;border-radius:0;border:none}::part(button),::part(example-button){width:100%;margin-top:0.5rem}::part(response),::part(meta-info),::part(history) li{padding:0.75rem;font-size:0.9rem}}";

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
    render() {
        return (index.h("div", { key: 'a3350954cc8d37fff45606db5794a5946978259d', part: "container" }, index.h("label", { key: '247b8a2275b4da82f2391c28a6211abec6be05ea', htmlFor: "question", part: "label" }, "Ask Henrik's CV bot anything"), index.h("input", { key: '6793fe4072432603993e0ec95a453154c37aa260', id: "question", part: "input", type: "text", value: this.question, onInput: e => this.question = e.target.value, placeholder: "Type your question here..." }), index.h("button", { key: '2a984d9341d2de09707a99edef3d4aba9d1c042e', part: "button", onClick: () => this.handleAsk(), disabled: this.loading }, this.loading ? 'Thinking like Henrik…' : 'Ask the CV bot'), index.h("div", { key: 'f4d2d109af6f51ec49ea26e2c0c02d781247e39a', part: "examples" }, index.h("p", { key: 'bf74f188c2191a820b21320fa4c1b14f2fc8b61f', part: "examples-label" }, "Example questions:"), this.examples.map(example => (index.h("button", { part: "example-button", onClick: () => this.question = example }, example)))), this.answer && (index.h("div", { key: '1a4d66a8976336c627bea26df7cc4441c67645f8', part: "response" }, index.h("p", { key: 'f0969862b3aa1b00a3cfea65c6f95491bf70549c' }, this.answer), index.h("span", { key: 'b1432e529c1b0543bbc29d3085bdac1e8fc2bbcc', part: "confidence", class: `confidence ${this.confidence.toLowerCase()}` }, this.confidence)))));
    }
};
CvChat.style = cvChatCss;

exports.cv_chat = CvChat;
//# sourceMappingURL=cv-chat.entry.cjs.js.map
