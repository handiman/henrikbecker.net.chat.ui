import { h } from "@stencil/core";
import { marked } from "marked";
export class CvChat {
    constructor() {
        this.collection = '';
        this.placeholder = 'Ask my CV bot anything...';
        this.error = 'Something went wrong while contacting my brain.';
        this.question = '';
        this.answer = '';
        this.chunks = [];
        this.loading = false;
        this.minimized = false;
        this.spinnerFrame = CvChat.spinnerFrames[0];
        this.spinnerIndex = 0;
    }
    async handleAsk() {
        if (!this.question.trim())
            return;
        this.loading = true;
        this.answer = '';
        this.chunks = [];
        this.startSpinner();
        try {
            const response = await fetch('https://henrikbecker.azurewebsites.net/ai/ask/' + this.collection, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(this.question)
            });
            const data = await response.json();
            this.answer = await marked(data.answer);
            this.chunks = data.chunks;
            this.logDebug(this.question, data);
        }
        catch (error) {
            this.answer = error + " " + this.error;
        }
        this.minimized = false;
        this.loading = false;
        this.stopSpinner();
    }
    startSpinner() {
        this.spinnerIndex = 0;
        this.spinnerFrame = CvChat.spinnerFrames[0];
        this.stopSpinner();
        this.spinnerTimer = setInterval(() => {
            this.spinnerIndex = (this.spinnerIndex + 1) % CvChat.spinnerFrames.length;
            this.spinnerFrame = CvChat.spinnerFrames[this.spinnerIndex];
        }, 120);
    }
    stopSpinner() {
        if (this.spinnerTimer) {
            clearInterval(this.spinnerTimer);
            this.spinnerTimer = undefined;
        }
    }
    disconnectedCallback() {
        this.stopSpinner();
    }
    logDebug(question, data) {
        console.groupCollapsed(`💬 ${question}`);
        console.log('🧠 Original Question:', question);
        console.log('📚 Chunks:', data.chunks);
        console.groupEnd();
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
        return (h("div", { key: 'b86fdaf953b6e2720aa8f33d4f071279bc2310cf', part: "container" }, h("div", { key: 'd43007826308a47af209002d2bfb6dee9f51f528', class: "input-wrapper" }, h("input", { key: 'f57a98c3b3fe448b0c523eb20aa72db68482a952', id: "question", part: "input", type: "text", value: this.question, onInput: e => this.question = e.target.value, onKeyDown: e => this.handleKeyDown(e), placeholder: this.placeholder }), h("button", { key: 'f5ab8d7ee1329c2853e5dfcd319207bfa1e61912', part: "icon-button", class: "ask-button", onClick: () => this.handleAsk(), disabled: this.loading, title: "Ask" }, this.loading ? (h("span", { class: "spinner", part: "spinner", "aria-hidden": "true" }, this.spinnerFrame)) : (h("img", { src: "/favicon.ico" })))), !this.minimized && this.answer && (h("div", { key: '2d86c3d849ef63f1cc00f58d37698b3d36042dec', part: "response", class: "response-box" }, h("p", { key: '88191c383f90cfb1cd6783d9c25b2b33d4c4512c', innerHTML: this.answer }), h("button", { key: 'f7bf2f480c47ac0d391636c75a8b04e1d9a0d283', class: "close-button", onClick: () => this.minimized = true, title: "St\u00E4ng" }, "\u00D7")))));
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
            }
        };
    }
    static get states() {
        return {
            "question": {},
            "answer": {},
            "chunks": {},
            "loading": {},
            "minimized": {},
            "spinnerFrame": {}
        };
    }
}
CvChat.spinnerFrames = ['/', '|', '\\', '-'];
//# sourceMappingURL=cv-chat.js.map
