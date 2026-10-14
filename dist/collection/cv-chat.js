import { h } from "@stencil/core";
import { marked } from "marked";
export class CvChat {
    constructor() {
        this.collection = '';
        /** Base URL of the ask endpoint; the collection name is appended. */
        this.endpoint = 'https://henrikbecker-chat.henrik-becker.workers.dev/ask/';
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
        return (h("div", { key: '7c8b7c48b17ace260af0e15e9ce1360da18cab59', part: "container" }, h("div", { key: '75709415fff3d886343d1df59435b85a060b2dc2', class: "input-wrapper" }, h("input", { key: '060d3be3b1dbf39b446aff533408f21fa6fa992e', id: "question", ref: el => this.inputEl = el, part: "input", type: "text", value: this.question, onInput: e => this.question = e.target.value, onKeyDown: e => this.handleKeyDown(e), placeholder: this.placeholder }), h("button", { key: 'dc367aa3861a226ad580395dde64a00eca744633', part: "icon-button", class: "ask-button", onClick: () => this.handleAsk(), disabled: this.loading, title: "Ask" }, this.loading ? (h("span", { class: "spinner", part: "spinner", "aria-hidden": "true" }, this.spinnerFrame)) : (h("img", { src: "/favicon.ico" })))), !this.minimized && this.answer && (h("div", { key: '58d65dcb006885eff1182ffecd4dad17081c5196', part: "response", class: "response-box" }, h("p", { key: '8a0e55fc98a3a36d2edf00049ae90504cda9acd8', innerHTML: this.answer }), h("button", { key: 'c9a54b67c162706c519c625c9863f4bd5d05d9ca', class: "close-button", onClick: () => this.minimized = true, title: "St\u00E4ng" }, "\u00D7")))));
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
                "defaultValue": "'https://henrikbecker-chat.henrik-becker.workers.dev/ask/'"
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
