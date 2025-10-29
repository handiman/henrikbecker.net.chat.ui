import { Component, h, State } from '@stencil/core';

@Component({
  tag: 'cv-chat',
  styleUrl: 'cv-chat.css',
  shadow: true
})
export class CvChat {
  @State() question: string = '';
  @State() answer: string = '';
  @State() confidence: string = '';
  @State() promptGuard: string = '';
  @State() chunks: string[] = [];
  @State() loading: boolean = false;

  examples = [
    "What has Henrik done in .NET?",
    "Has he worked with automation?",
    "What's his philosophy on AI?"
  ];

  async handleAsk() {
    if (!this.question.trim()) return;

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
    } catch (error) {
      this.answer = error + " Something went wrong while contacting Henrik's brain.";
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
            placeholder="Ask Henrik's CV bot anything..."
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
        { false && (
          <div part="examples">
            <p part="examples-label">Example questions:</p>
            {this.examples.map(example => (
              <button part="example-button" onClick={() => this.question = example}>
                {example}
              </button>
            ))}
          </div>
        )}

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