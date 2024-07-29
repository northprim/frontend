import {NP_ATTR, NP_EVT} from "../constants";

declare global {
    interface HTMLElementEventMap {
        'np-select': CustomEvent<{ tab: string }>;
    }
}

const npSelection = <TBase extends new (...args: any[]) => HTMLElement>(Base: TBase) => {
    return class NpSelection extends Base {
        selected = false;
        name?: string;

        constructor(...args: any[]) {
            super(args);
            // TODO: extract the "required attribute" to a helper
            const nameAttr = this.getAttribute('name');
            if (!nameAttr) {
                throw new Error(`Missing 'name' attribute on ${this}`);
            }
            this.name = nameAttr;
            this.addEventListener('click', () => this.dispatchSelect());
        }

        select() {
            this.selected = true;
            this.setAttribute(NP_ATTR.selected, '');
        }

        deselect() {
            this.selected = false;
            this.removeAttribute(NP_ATTR.selected);
        }

        dispatchSelect() {
            if (!this.selected) {
                this.dispatchEvent(new CustomEvent(NP_EVT.select, {
                    bubbles: true,
                    detail: {tab: this.name}
                }));
            }
        }

    }

}

export {npSelection};