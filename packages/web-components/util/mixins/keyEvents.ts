const npKeyEvents = <TBase extends new (...args: any[]) => HTMLElement>(Base: TBase) => {
    return class NpKeyEvents extends Base {

        onKeySelect?: (code: string) => void;

        constructor(...args: any[]) {
            super(args);
        }

        connectedCallback() {
            this.setAttribute('tabindex', '0');
            this.addEventListener('keydown', ({code}) => {
                if (['Space', 'Enter'].includes(code)) {
                    this.onKeySelect?.(code);
                }
            });
        }
    }
}

export {npKeyEvents};