import {NpTab} from "./tab.ts";
import {NpTabPanel} from "./tabPanel.ts";
import {NP_ATTR, NP_EVT} from "../../util/constants";

declare global {
    interface HTMLElementEventMap {
        'np-selected-tab-change': CustomEvent<{ tab: string }>;
    }
}

type TabPanelPair = { tab: NpTab; panel: NpTabPanel };

/**
 * @slot tabs - Slot for np-tab elements
 * @slot panels - Slot for np-tab-panel elements
 *
 * @csspart tabs - Styles the np-tab container
 * @csspart content - Styles the np-tab-panel container
 *
 */
class NpTabs extends HTMLElement {

    private tabs?: Record<string, TabPanelPair>;

    private init: Record<keyof TabPanelPair, boolean> = {panel: false, tab: false};

    private tabSlot: HTMLSlotElement | null = null;
    private panelSlot: HTMLSlotElement | null = null;

    currentTab?: string;

    get tabSlotElements(): NpTab[] {
        // TODO: Add a warning to the end user when filtering out elements.
        return this.tabSlot?.assignedElements().filter((el) => el instanceof NpTab) || [];
    }

    get panelSlotElements() {
        // TODO: Add a warning to the end user when filtering out elements.
        return this.panelSlot?.assignedElements().filter((el) => el && el instanceof NpTabPanel) || [];
    }

    private onTabSlotChange = () => {
        this.setupTabs(this.tabSlotElements, 'tab');
        this.initSelection('tab');
    }

    private onPanelSlotChange = () => {
        this.setupTabs(this.panelSlotElements, 'panel');
        this.initSelection('panel');
    }

    private setupTabs(elements: NpTab[] | NpTabPanel[], slot: keyof TabPanelPair) {
        this.tabs = elements.reduce((acc, curr) => ({
            ...acc,
            [curr.name!]: {
                ...acc[curr.name!],
                [slot]: curr,
            }
        }), this.tabs || {});
    }

    private initSelection = (key: keyof TabPanelPair) => {
        if (!this.init[key]) {
            const tabName = this.getAttribute(NP_ATTR.selectedTab) || this.tabSlotElements[0].name!;
            const {tab, panel} = this.tabs?.[tabName] || {};
            if (tab && panel) {
                this.init[key] = true;
                this.selectTab(tabName, true);
            }
        }
    }

    private selectTab(tab: string, dispatch?: boolean) {
        if (this.currentTab) {
            this.tabs?.[this.currentTab].tab.deselect();
            this.tabs?.[this.currentTab].panel.deselect();
        }

        this.currentTab = tab;
        this.setAttribute(NP_ATTR.selectedTab, tab);

        this.tabs?.[this.currentTab].tab.select();
        this.tabs?.[this.currentTab].panel.select();

        if (dispatch) {
            this.dispatchEvent(new CustomEvent(NP_EVT.selectedTabChange, {bubbles: true, detail: {tab}}));
        }
    }

    static get observedAttributes() {
        return [NP_ATTR.selectedTab];
    }

    constructor() {
        super();
        this.attachShadow({mode: 'open'});
    }

    private connectedCallback() {
        this.render();

        if (this.shadowRoot) {
            this.tabSlot = this.shadowRoot.querySelector('slot[name="tab"]');
            this.panelSlot = this.shadowRoot.querySelector('slot[name="content"]');

            this.tabSlot?.addEventListener('slotchange', this.onTabSlotChange);
            this.panelSlot?.addEventListener('slotchange', this.onPanelSlotChange);

            this.tabSlot?.addEventListener(NP_EVT.select, (event) => {
                this.selectTab(event.detail.tab, true);
            })
        }
    }

    private attributeChangedCallback(name: string, _: any, newValue: string | null) {
        if (name === NP_ATTR.selectedTab && newValue && newValue !== this.currentTab) {
            this.selectTab(newValue);
        }
    }

    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
                <style>
                    :host {
                        display: block;
                    }
                    [part="tabs"] {
                        display: flex;
                        flex-direction: row;
                    }
                </style>
                <div part="tabs">
                    <slot name="tab"></slot>
                </div>
                <div part="content">
                    <slot name="content"></slot>
                </div>
            `;
        }
    }
}

customElements.define('np-tabs', NpTabs);

export {NpTabs};