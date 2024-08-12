import {npKeyEvents, npSelectable} from "../../util/mixins";

class NpTab extends npKeyEvents(npSelectable(HTMLElement)) {

    constructor() {
        super();
        this.attachShadow({mode: 'open'});
    }

    onKeySelect = this.dispatchSelect;

    connectedCallback() {
        this.render();
        super.connectedCallback();
    }

    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `<slot></slot>`;
        }
    }
}

customElements.define('np-tab', NpTab);

export {NpTab};