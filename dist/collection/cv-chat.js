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
    /** Puts the cursor in the question box. */
    async focusInput() {
        var _a;
        (_a = this.inputEl) === null || _a === void 0 ? void 0 : _a.focus();
    }
    /** Asks a question as if the visitor had typed it and pressed Enter. */
    async ask(question) {
        var _a;
        this.question = question;
        (_a = this.inputEl) === null || _a === void 0 ? void 0 : _a.focus();
        await this.handleAsk();
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
        return (h("div", { key: '9e5659c9cad6587dca0b4b26e4085c0ab6a2d711', part: "container" }, h("div", { key: '62dacd1c42b33e017d71ed17831ebdf4f34b9264', class: "input-wrapper" }, h("input", { key: '13b2ac2004ca6179948d8464fb8e4ee163132759', id: "question", ref: el => this.inputEl = el, part: "input", type: "text", value: this.question, onInput: e => this.question = e.target.value, onKeyDown: e => this.handleKeyDown(e), placeholder: this.placeholder }), h("button", { key: 'cb77650af727a4d755acdee9ae9d194b462204ac', part: "icon-button", class: "ask-button", onClick: () => this.handleAsk(), disabled: this.loading, title: "Ask" }, this.loading ? (h("span", { class: "spinner", part: "spinner", "aria-hidden": "true" }, this.spinnerFrame)) : (h("img", { src: "/favicon.ico" })))), !this.minimized && this.answer && (h("div", { key: 'fdf548cfd5533b0f03d6d7fa97a4678ed52b8696', part: "response", class: "response-box" }, h("p", { key: '5512e8598a365904f8eb1b26820576a7254e10fd', innerHTML: this.answer }), h("button", { key: '5e869972ab5578224dbb253cf8d0657492f5cfe8', class: "close-button", onClick: () => this.minimized = true, title: "St\u00E4ng" }, "\u00D7")))));
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
    static get methods() {
        return {
            "focusInput": {
                "complexType": {
                    "signature": "() => Promise<void>",
                    "parameters": [],
                    "references": {
                        "Promise": {
                            "location": "global",
                            "id": "global::Promise"
                        }
                    },
                    "return": "Promise<void>"
                },
                "docs": {
                    "text": "Puts the cursor in the question box.",
                    "tags": []
                }
            },
            "ask": {
                "complexType": {
                    "signature": "(question: string) => Promise<void>",
                    "parameters": [{
                            "name": "question",
                            "type": "string",
                            "docs": ""
                        }],
                    "references": {
                        "Promise": {
                            "location": "global",
                            "id": "global::Promise"
                        }
                    },
                    "return": "Promise<void>"
                },
                "docs": {
                    "text": "Asks a question as if the visitor had typed it and pressed Enter.",
                    "tags": []
                }
            }
        };
    }
}
CvChat.spinnerFrames = ['/', '|', '\\', '-'];
//# sourceMappingURL=cv-chat.js.map
