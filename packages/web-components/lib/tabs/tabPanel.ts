import {npSelectable} from "../../util/mixins";
import {NP_ATTR} from "../../util/constants";

class NpTabPanel extends npSelectable(HTMLElement) {

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
          :host(:not([${NP_ATTR.selected}])){
            display: none;
          }
        </style>
        <slot>
        </slot>
      `;
        }
    }
}

customElements.define('np-tab-panel', NpTabPanel);

export {NpTabPanel};