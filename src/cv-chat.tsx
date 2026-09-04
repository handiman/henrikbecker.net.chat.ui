import { Component, Prop, h, State, Element } from '@stencil/core';
import { marked } from 'marked';

@Component({
  tag: 'cv-chat',
  styleUrl: 'cv-chat.css',
  shadow: true
})
export class CvChat {
  @Prop() collection: string = '';
  @Prop() placeholder: string = 'Ask my CV bot anything...'
  @Prop() error: string = 'Something went wrong while contacting my brain.'
  @State() question: string = '';
  @State() answer: string = '';
  @State() chunks: string[] = [];
  @State() loading: boolean = false;
  @State() minimized: boolean = false;
  @State() spinnerFrame: string = CvChat.spinnerFrames[0];

  private static spinnerFrames = ['/', '|', '\\', '-'];
  private spinnerIndex = 0;
  private spinnerTimer?: ReturnType<typeof setInterval>;

  async handleAsk() {
    if (!this.question.trim()) return;

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
    } catch (error) {
      this.answer = error + " " + this.error;
    }

    this.minimized = false;
    this.loading = false;
    this.stopSpinner();
  }

  private startSpinner() {
    this.spinnerIndex = 0;
    this.spinnerFrame = CvChat.spinnerFrames[0];
    this.stopSpinner();
    this.spinnerTimer = setInterval(() => {
      this.spinnerIndex = (this.spinnerIndex + 1) % CvChat.spinnerFrames.length;
      this.spinnerFrame = CvChat.spinnerFrames[this.spinnerIndex];
    }, 120);
  }

  private stopSpinner() {
    if (this.spinnerTimer) {
      clearInterval(this.spinnerTimer);
      this.spinnerTimer = undefined;
    }
  }

  disconnectedCallback() {
    this.stopSpinner();
  }

  private logDebug(question: string, data: any) {
    console.groupCollapsed(`💬 ${question}`);
    console.log('🧠 Original Question:', question);
    console.log('📚 Chunks:', data.chunks);
    console.groupEnd();
  }

  private handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      e.preventDefault();
      this.handleAsk();
    }
  }
  
  toggleMinimize() {
    this.minimized = !this.minimized;
  }

  render() {
    return (
      <div part="container">
        <div class="input-wrapper">
          <input
            id="question"
            part="input"
            type="text"
            value={this.question}
            onInput={e => this.question = (e.target as HTMLInputElement).value}
            onKeyDown={e => this.handleKeyDown(e)}
            placeholder={this.placeholder}
          />
          <button
            part="icon-button"
            class="ask-button"
            onClick={() => this.handleAsk()}
            disabled={this.loading}
            title="Ask"
          >
            {this.loading ? (
                <span class="spinner" part="spinner" aria-hidden="true">{this.spinnerFrame}</span>
              ) : (
                <img src="/favicon.ico" />
              )}
          </button>
        </div>

        {!this.minimized && this.answer && (
          <div part="response" class="response-box">
            <p innerHTML={this.answer}></p>
            <button class="close-button" onClick={() => this.minimized = true} title="Stäng">
              &times;
            </button>
          </div>
        )}
      </div>
    );
  }
}