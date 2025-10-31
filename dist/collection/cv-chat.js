import { h } from "@stencil/core";
export class CvChat {
    constructor() {
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
    static get properties() {
        return {
            "ingestEndpoint": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "ingest-endpoint",
                "defaultValue": "'https://henrikbecker.azurewebsites.net/ai/ingest/henrik-becker'"
            },
            "questionPlaceholder": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "question-placeholder",
                "defaultValue": "'Ask Henrik\\'s CV bot anything...'"
            },
            "errorMessage": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "error-message",
                "defaultValue": "'Something went wrong while contacting Henrik\u00B4\\'s brain.'"
            }
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
