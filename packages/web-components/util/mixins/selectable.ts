import {NP_ATTR, NP_EVT} from "../constants";

declare global {
    interface HTMLElementEventMap {
        'np-select': CustomEvent<{ tab: string }>;
    }
}

const npSelectable = <TBase extends new (...args: any[]) => HTMLElement>(Base: TBase) => {
    return class NpSelectable extends Base {
        selected = false;

        get name() {
            const nameAttr = this.getAttribute("name");
            if (nameAttr) {
                return nameAttr;
            } else {
                console.warn(`Missing 'name' attribute on element: %o`, this);
                return "";
            }
        }

        set name(val: string) {
            this.setAttribute('name', val);
        }

        constructor(...args: any[]) {
            super(args);
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

export {npSelectable};
