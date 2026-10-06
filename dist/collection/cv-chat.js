import { h } from "@stencil/core";
import { marked } from "marked";
export class CvChat {
    constructor() {
        this.collection = '';
        /** Base URL of the ask endpoint; the collection name is appended. */
        this.endpoint = 'https://ai-worker.henrik-becker.workers.dev/ask/';
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
            const response = await fetch(this.endpoint + this.collection, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(this.question)
            });
            // A busy or failing backend answers with an error status (and sometimes no body);
            // show the friendly `error` text instead of a parse error.
            if (!response.ok) {
                throw new Error(`HTTP ${response.status} ${response.statusText}`);
            }
            const data = await response.json();
            this.answer = await marked(data.answer);
            this.chunks = data.chunks;
            this.logDebug(this.question, data);
        }
        catch (error) {
            console.error('cv-chat:', error);
            this.answer = this.error;
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
        return (h("div", { key: '57df648cd4109fbfac7af3efa1e324f93d7da88d', part: "container" }, h("div", { key: '08866d45a6e175b900ce4277ffd98fb3f8947ec0', class: "input-wrapper" }, h("input", { key: 'a80f5aff34c0fd42eea3bd036ec0c8bb05830470', id: "question", ref: el => this.inputEl = el, part: "input", type: "text", value: this.question, onInput: e => this.question = e.target.value, onKeyDown: e => this.handleKeyDown(e), placeholder: this.placeholder }), h("button", { key: 'c9d2e134667f0d3d41d40ebc7389a49ec9ad8df4', part: "icon-button", class: "ask-button", onClick: () => this.handleAsk(), disabled: this.loading, title: "Ask" }, this.loading ? (h("span", { class: "spinner", part: "spinner", "aria-hidden": "true" }, this.spinnerFrame)) : (h("img", { src: "/favicon.ico" })))), !this.minimized && this.answer && (h("div", { key: 'b1335aa5cce8e4069deb77221e42be3ed4c08651', part: "response", class: "response-box" }, h("p", { key: '33f166b12b614d136e725b5192ea8f09a701c20c', innerHTML: this.answer }), h("button", { key: '1e6e7b535bdb9d8e6708e2eec12151e36815a86b', class: "close-button", onClick: () => this.minimized = true, title: "St\u00E4ng" }, "\u00D7")))));
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
            "endpoint": {
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
                    "text": "Base URL of the ask endpoint; the collection name is appended."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "endpoint",
                "defaultValue": "'https://ai-worker.henrik-becker.workers.dev/ask/'"
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
