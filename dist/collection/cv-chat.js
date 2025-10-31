import { h } from "@stencil/core";
export class CvChat {
    constructor() {
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
            "collection": {
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
                "attribute": "collection",
                "defaultValue": "''"
            },
            "placeholder": {
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
                "attribute": "placeholder",
                "defaultValue": "'Ask my CV bot anything...'"
            },
            "error": {
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
                "attribute": "error",
                "defaultValue": "'Something went wrong while contacting my brain.'"
            },
            "answerPosition": {
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
                "attribute": "answer-position",
                "defaultValue": "'below'"
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
            "loading": {},
            "minimized": {}
        };
    }
}
//# sourceMappingURL=cv-chat.js.map
