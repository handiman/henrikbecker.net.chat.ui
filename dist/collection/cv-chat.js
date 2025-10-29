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
    handleKeyDown(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            this.handleAsk();
        }
    }
    render() {
        return (h("div", { key: 'be7c4b793799de7e0f67ef86427f9ce99f988fac', part: "container" }, h("div", { key: '4c0546fdc567a958267fe930bd5c5bf84dede4f8', class: "input-wrapper" }, h("input", { key: 'e8fb7df6c6aa689671196f45f702d1dd231dbaaa', id: "question", part: "input", type: "text", value: this.question, onInput: e => this.question = e.target.value, onKeyDown: e => this.handleKeyDown(e), placeholder: "Ask Henrik's CV bot anything..." }), h("button", { key: '6a60a56fd378626f52d9a77de639fece4a765ba3', part: "icon-button", class: "ask-button", onClick: () => this.handleAsk(), disabled: this.loading, title: "Ask" }, this.loading ? h("span", { class: "spinner" }) : '🤖')), false && (h("div", { key: '2b6da1b692ab97934e11f6827514e6558fac900f', part: "examples" }, h("p", { key: '943752967ac0c5195632f8836eb8a789b527ac87', part: "examples-label" }, "Example questions:"), this.examples.map(example => (h("button", { part: "example-button", onClick: () => this.question = example }, example))))), this.answer && (h("div", { key: '265fddf2560ce96b0a636320e9d3bfbf172df5af', part: "response" }, h("p", { key: 'd98a0ef5e594123401fa446bb0764631162443de' }, this.answer), h("span", { key: 'a99ab1e4df172b568c25619756eae4745f88f177', part: "confidence", class: `confidence ${this.confidence.toLowerCase()}` }, this.confidence)))));
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
