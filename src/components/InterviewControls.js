class InterviewControls extends HTMLElement {
  connectedCallback() {
    console.log('InterviewControls component created');

    this.attachShadow({ mode: 'open' });

    this.createButtons();

    this.setAttribute('active', false);
  }

  static get observedAttributes() {
    return ['active'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'active') {
      this.setInterviewControls(newValue);
    }
  }

  setInterviewControls(status) {
    if (this.shadowRoot.firstChild) {
      this.shadowRoot.removeChild(this.shadowRoot.firstChild);
    }
    this.shadowRoot.appendChild(
      status
        ? this.stopInterviewButton.cloneNode()
        : this.startInterviewButton.cloneNode()
    );
  }

  createButtons() {
    this.startInterviewButton = document.createElement('button');
    this.startInterviewButton.innerText = 'Начать собеседование';
    this.startInterviewButton.onclick = this.getAttribute('onstartinterview');

    this.stopInterviewButton = document.createElement('button');
    this.stopInterviewButton.innerText = 'Закончить собеседование';
    this.stopInterviewButton.onclick = this.getAttribute('onstopinterview');
  }
}

export default InterviewControls;
