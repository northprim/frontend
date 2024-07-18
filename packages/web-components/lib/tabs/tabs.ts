class NpTabs extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
    }

    connectedCallback() {
        this.render();
    }

    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
        <style>
          /* Add your styles here */
          .tabs{
          background: lightblue;
          }
        </style>
        <span>asd</span>
        <div class="tabs">
          <slot name="tab"></slot>
        </div>
        <div class="tab-content">
          <slot name="tab-content"></slot>
        </div>
      `;
        }
    }
}

customElements.define('np-tabs', NpTabs);

export {NpTabs};