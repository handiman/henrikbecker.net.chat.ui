import { Component, Prop, h, State } from '@stencil/core';

@Component({
  tag: 'cv-chat',
  styleUrl: 'cv-chat.css',
  shadow: true
})
export class CvChat {
  @Prop() ingestEndpoint: string = 'https://henrikbecker.azurewebsites.net/ai/ingest/henrik-becker';
  @Prop() questionPlaceholder: string = 'Ask Henrik\'s CV bot anything...'
  @Prop() errorMessage: string = 'Something went wrong while contacting Henrik´\'s brain.'
  @State() question: string = '';
  @State() answer: string = '';
  @State() confidence: string = '';
  @State() promptGuard: string = '';
  @State() chunks: string[] = [];
  @State() loading: boolean = false;

  async handleAsk() {
    if (!this.question.trim()) return;

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
    } catch (error) {
      this.answer = error + " " + this.errorMessage;
    }

    this.loading = false;
  }

  private logDebug(question: string, data: any) {
    console.groupCollapsed(`💬 ${question}`);
    console.log('🧩 PromptGuard:', data.promptGuard);
    console.log('📚 Chunks:', data.chunks);
    console.log('🎯 Confidence:', data.confidence);
    console.log('🧠 Response Type:', this.extractResponseType(data.answer));
    console.log('🧠 Original Question:', question);
    console.groupEnd();
  }

  private extractResponseType(answer: string): string {
    if (answer.includes('Faktabaserat')) return 'Faktabaserat';
    if (answer.includes('Tolkning')) return 'Tolkning';
    if (answer.includes('Kreativ')) return 'Kreativ extrapolering';
    return 'Okänt';
  }
  
  private handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      e.preventDefault();
      this.handleAsk();
    }
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
            placeholder={this.questionPlaceholder}
          />
          <button
            part="icon-button"
            class="ask-button"
            onClick={() => this.handleAsk()}
            disabled={this.loading}
            title="Ask"
          >
            {this.loading ? <span class="spinner" /> : '🤖'}
          </button>
        </div>

        {this.answer && (
          <div part="response">
            <p>{this.answer}</p>
            <span part="confidence" class={`confidence ${this.confidence.toLowerCase()}`}>
              {this.confidence}
            </span>
          </div>
        )}
      </div>
    );
  }
}