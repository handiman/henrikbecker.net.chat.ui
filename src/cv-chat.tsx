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

  async handleAsk() {
    if (!this.question.trim()) return;

    this.loading = true;
    this.answer = '';
    this.chunks = [];

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
                <img src="/favicon.ico" class="spinner" />
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