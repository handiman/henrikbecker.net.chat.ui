import { r as registerInstance, h } from './index-C_P-tY0Y.js';

const cvChatCss = ":host{--cvchat-bg:#ffffff;--cvchat-color:#333333;--cvchat-font:system-ui, sans-serif;--cvchat-border-radius:8px;--cvchat-button-bg:#0078d4;--cvchat-button-color:#ffffff;--cvchat-button-disabled-bg:#999999;--cvchat-example-bg:#eeeeee;--cvchat-response-bg:#f9f9f9;--cvchat-meta-bg:#eef;--cvchat-history-bg:#f4f4f4;display:block;background-color:var(--cvchat-bg);color:var(--cvchat-color);font-family:var(--cvchat-font);border-radius:var(--cvchat-border-radius);padding:1rem;box-sizing:border-box;max-width:600px;margin:auto}::part(label){font-weight:bold;display:block;margin-bottom:0.5rem}::part(input){width:100%;padding:0.5rem;margin-bottom:0.75rem;font-size:1rem;border:1px solid #aaa;border-radius:4px;box-sizing:border-box}::part(button){padding:0.5rem 1rem;font-size:1rem;background-color:var(--cvchat-button-bg);color:var(--cvchat-button-color);border:none;border-radius:4px;cursor:pointer;margin-top:0.25rem}::part(button:disabled){background-color:var(--cvchat-button-disabled-bg);cursor:wait}::part(examples){margin-top:1rem}::part(examples-label){font-weight:bold;margin-bottom:0.25rem}::part(example-button){background-color:var(--cvchat-example-bg);color:#333;border:1px solid #ccc;margin:0.25rem 0.25rem 0.25rem 0;font-size:0.9rem;padding:0.4rem 0.6rem;border-radius:4px;cursor:pointer}::part(response){margin-top:1.5rem;background:var(--cvchat-response-bg);padding:1rem;border-radius:6px;border-left:4px solid var(--cvchat-button-bg)}::part(confidence){display:inline-block;margin-top:0.5rem;font-size:0.85rem;padding:0.25rem 0.5rem;border-radius:4px;font-weight:bold}.confidence.factual{background-color:#d4edda;color:#155724}.confidence.interpretation{background-color:#fff3cd;color:#856404}.confidence.creative{background-color:#f8d7da;color:#721c24}::part(tone){margin-top:0.5rem;font-style:italic;color:#444}::part(meta-toggle){margin-top:0.75rem;background:none;border:none;color:var(--cvchat-button-bg);cursor:pointer;font-size:0.9rem;text-decoration:underline}::part(meta-info){margin-top:0.5rem;font-size:0.85rem;background:var(--cvchat-meta-bg);padding:0.5rem;border-radius:4px}::part(history){margin-top:2rem}::part(history) h4{margin-bottom:0.5rem}::part(history) ul{list-style:none;padding-left:0}::part(history) li{margin-bottom:1rem;background:var(--cvchat-history-bg);padding:0.75rem;border-radius:4px;font-size:0.9rem}@media (max-width: 480px){:host{padding:0.75rem;border-radius:0;border:none}::part(button),::part(example-button){width:100%;margin-top:0.5rem}::part(response),::part(meta-info),::part(history) li{padding:0.75rem;font-size:0.9rem}}";

const CvChat = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.question = '';
        this.answer = '';
        this.confidence = '';
        this.promptGuard = '';
        this.chunks = [];
        this.loading = false;
        this.showMeta = false;
        this.history = [];
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
                body: JSON.stringify(this.question) // sending raw string
            });
            const data = await response.json();
            this.answer = data.answer;
            this.confidence = data.confidence;
            this.promptGuard = data.promptGuard;
            this.chunks = data.chunks;
            this.history = [...this.history, { question: this.question, answer: data.answer }];
        }
        catch (error) {
            this.answer = error + " Something went wrong while contacting Henrik's brain.";
        }
        this.loading = false;
    }
    render() {
        return (h("div", { key: '3405a30969e1dedddeae89bf64c08477609413dc', part: "container" }, h("label", { key: '4587e1198d7a17ed290b4d33e561a409bc7a25b3', htmlFor: "question", part: "label" }, "Ask Henrik's CV bot anything"), h("input", { key: 'e197144f1838cb154509c06cb8d6b4424af728e7', id: "question", part: "input", type: "text", value: this.question, onInput: e => this.question = e.target.value, placeholder: "Type your question here..." }), h("button", { key: '0c7688e5a27d9562c8fe135cc4ed05f275c95143', part: "button", onClick: () => this.handleAsk(), disabled: this.loading }, this.loading ? 'Thinking like Henrik…' : 'Ask the CV bot'), h("div", { key: 'fad99280e3b47598e6f80d2a2821b69431c3170b', part: "examples" }, h("p", { key: '4b7f6a8c0807932fede56d8a791260bfc9e39a71', part: "examples-label" }, "Example questions:"), this.examples.map(example => (h("button", { part: "example-button", onClick: () => this.question = example }, example)))), this.answer && (h("div", { key: '27a50a48e1a8a4d3b41ee85b37e0f8b0dacc29b6', part: "response" }, h("p", { key: '034fafc636b4d306a4dc2f216f4ee8350811c2a7' }, this.answer), h("span", { key: 'e3d3ae6cf65c16811fa3e141b4330f67209366f9', part: "confidence", class: `confidence ${this.confidence.toLowerCase()}` }, this.confidence), h("p", { key: '77f19798d6704582df0c5611cf577a3ce89c0c92', part: "tone" }, "\uD83E\uDDE0 Tone: Henrik-style"), h("button", { key: 'd30932f9117047f68dfb53687b53172f2a7caa38', part: "meta-toggle", onClick: () => this.showMeta = !this.showMeta }, this.showMeta ? 'Hide meta' : 'Show meta'), this.showMeta && (h("div", { key: '265a2be7f3e903c88ef816195ca10d1e7541b328', part: "meta-info" }, h("p", { key: 'affddc8ceaefdc70edaec09ba5084fdad94d890d' }, h("strong", { key: '11b7f1b07fc6d15ddfae013f51e452e1f92b9178' }, "PromptGuard:"), " ", this.promptGuard), h("p", { key: 'ae6236859a0e7aa6e1cd00345f2bc2eb5a2a275d' }, h("strong", { key: 'f13b1374d2403fd5b61dcb45c2aa169de37554ab' }, "Chunks:")), h("ul", { key: '602c2b5b2cfc7ee818324f3d8e75057eb3d4484e' }, this.chunks.map(chunk => h("li", null, chunk))))))), this.history.length > 0 && (h("div", { key: 'e09794f4e3ae25907659a5f3c47774be8b7ac335', part: "history" }, h("h4", { key: '55dea087cf861d8d9d97113ca9aa72bb9b4cdcbf' }, "Previous questions"), h("ul", { key: 'e1809a10fa4eb28e8ccd7ea8d542667ac33c5d65' }, this.history.map((item, index) => (h("li", { key: index }, h("strong", null, item.question), h("br", null), h("span", null, item.answer)))))))));
    }
};
CvChat.style = cvChatCss;

export { CvChat as cv_chat };
//# sourceMappingURL=cv-chat.entry.js.map
