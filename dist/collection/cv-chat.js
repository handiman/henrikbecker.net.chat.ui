import { h } from "@stencil/core";
export class CvChat {
    constructor() {
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
    static get is() { return "cv-chat"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["cv-chat.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["cv-chat.css"]
        };
    }
    static get states() {
        return {
            "question": {},
            "answer": {},
            "confidence": {},
            "promptGuard": {},
            "chunks": {},
            "loading": {},
            "showMeta": {},
            "history": {}
        };
    }
}
//# sourceMappingURL=cv-chat.js.map
