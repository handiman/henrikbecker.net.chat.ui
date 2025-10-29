import { h } from "@stencil/core";
export class CvChat {
    constructor() {
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
        return (h("div", { key: 'a3350954cc8d37fff45606db5794a5946978259d', part: "container" }, h("label", { key: '247b8a2275b4da82f2391c28a6211abec6be05ea', htmlFor: "question", part: "label" }, "Ask Henrik's CV bot anything"), h("input", { key: '6793fe4072432603993e0ec95a453154c37aa260', id: "question", part: "input", type: "text", value: this.question, onInput: e => this.question = e.target.value, placeholder: "Type your question here..." }), h("button", { key: '2a984d9341d2de09707a99edef3d4aba9d1c042e', part: "button", onClick: () => this.handleAsk(), disabled: this.loading }, this.loading ? 'Thinking like Henrik…' : 'Ask the CV bot'), h("div", { key: 'f4d2d109af6f51ec49ea26e2c0c02d781247e39a', part: "examples" }, h("p", { key: 'bf74f188c2191a820b21320fa4c1b14f2fc8b61f', part: "examples-label" }, "Example questions:"), this.examples.map(example => (h("button", { part: "example-button", onClick: () => this.question = example }, example)))), this.answer && (h("div", { key: '1a4d66a8976336c627bea26df7cc4441c67645f8', part: "response" }, h("p", { key: 'f0969862b3aa1b00a3cfea65c6f95491bf70549c' }, this.answer), h("span", { key: 'b1432e529c1b0543bbc29d3085bdac1e8fc2bbcc', part: "confidence", class: `confidence ${this.confidence.toLowerCase()}` }, this.confidence)))));
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
            "loading": {}
        };
    }
}
//# sourceMappingURL=cv-chat.js.map
