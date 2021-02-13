class Interview extends HTMLElement {
  connectedCallback() {
    console.log('Interview component created');

    const template = document.getElementById('interview_template');
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.append(template.content.cloneNode(true));

    this.createButtons();

    this.setAttribute('active', false);
  }

  static get observedAttributes() {
    return ['active'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'active') {
      this.setControls(newValue);
    }
  }

  async handleStartInterview() {
    await this.setLocalView();
    this.setAttribute('active', true);
  }

  async handleStopInterview() {
    await this.clearLocalView();
    this.setAttribute('active', false);
  }

  async setLocalView() {
    const localViewElement = this.shadowRoot.getElementById('local_view');
    const constraints = { video: true, audio: true };
    const localStream = await navigator.mediaDevices.getUserMedia(constraints);
    console.log('Got MediaStream:', localStream);
    this.localStream = localStream;
    localViewElement.srcObject = localStream;
  }

  async clearLocalView() {
    const localViewElement = this.shadowRoot.getElementById('local_view');
    localViewElement.srcObject = null;
    this.localStream.getTracks().forEach(function (track) {
      track.stop();
    });
    this.localStream = null;
  }

  setControls(status) {
    const controls = this.shadowRoot.getElementById('controls');
    controls.firstChild && controls.removeChild(controls.firstChild);
    controls.appendChild(
      status === 'true' ? this.stopInterviewButton : this.startInterviewButton
    );
  }

  createButtons() {
    this.startInterviewButton = document.createElement('button');
    this.startInterviewButton.innerText = 'Начать собеседование';
    this.startInterviewButton.onclick = () => this.handleStartInterview();

    this.stopInterviewButton = document.createElement('button');
    this.stopInterviewButton.innerText = 'Завершить собеседование';
    this.stopInterviewButton.onclick = () => this.handleStopInterview();
  }
}

export default Interview;
