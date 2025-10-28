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
  @State() showMeta: boolean = false;
  @State() history: { question: string; answer: string }[] = [];

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
        body: JSON.stringify(this.question) // sending raw string
      });

      const data = await response.json();
      this.answer = data.answer;
      this.confidence = data.confidence;
      this.promptGuard = data.promptGuard;
      this.chunks = data.chunks;
      this.history = [...this.history, { question: this.question, answer: data.answer }];
    } catch (error) {
      this.answer = error + " Something went wrong while contacting Henrik's brain.";
    }

    this.loading = false;
  }

  render() {
    return (
      <div part="container">
        <label htmlFor="question" part="label">Ask Henrik's CV bot anything</label>
        <input
          id="question"
          part="input"
          type="text"
          value={this.question}
          onInput={e => this.question = (e.target as HTMLInputElement).value}
          placeholder="Type your question here..."
        />
        <button part="button" onClick={() => this.handleAsk()} disabled={this.loading}>
          {this.loading ? 'Thinking like Henrik…' : 'Ask the CV bot'}
        </button>

        <div part="examples">
          <p part="examples-label">Example questions:</p>
          {this.examples.map(example => (
            <button part="example-button" onClick={() => this.question = example}>
              {example}
            </button>
          ))}
        </div>

        {this.answer && (
          <div part="response">
            <p>{this.answer}</p>
            <span part="confidence" class={`confidence ${this.confidence.toLowerCase()}`}>
              {this.confidence}
            </span>
            <p part="tone">🧠 Tone: Henrik-style</p>

            <button part="meta-toggle" onClick={() => this.showMeta = !this.showMeta}>
              {this.showMeta ? 'Hide meta' : 'Show meta'}
            </button>

            {this.showMeta && (
              <div part="meta-info">
                <p><strong>PromptGuard:</strong> {this.promptGuard}</p>
                <p><strong>Chunks:</strong></p>
                <ul>
                  {this.chunks.map(chunk => <li>{chunk}</li>)}
                </ul>
              </div>
            )}
          </div>
        )}

        {this.history.length > 0 && (
          <div part="history">
            <h4>Previous questions</h4>
            <ul>
              {this.history.map((item, index) => (
                <li key={index}>
                  <strong>{item.question}</strong><br />
                  <span>{item.answer}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }
}