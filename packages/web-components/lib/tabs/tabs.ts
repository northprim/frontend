type TabType = 'a' | 'b';

class NpTabs extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
    }

    type: TabType = 'a';

    connectedCallback() {
        this.render();
    }

    render() {
        this.type = 'b';
        console.info('render!!');
        1
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