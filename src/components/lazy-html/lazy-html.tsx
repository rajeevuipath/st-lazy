import {Component, Prop, Element, Event, EventEmitter} from '@stencil/core';
import {Lazy, LazyHost, LazyMargin} from '../../utils/utils';

/**
 * Component to lazy load images while its scrolled to viewport.
 */
@Component({
    tag: 'lazy-html'
})
export class LazyHtml {

    /**
     * Request url
     */
    @Prop() url: string;

    /**
     * Request url
     */
    @Prop() placeholder: string = '';

    /**
     * Determines how far from the viewport lazy loading starts.
     * Can have values similar to the CSS margin property, e.g. "10px 20px 30px 40px" (top, right, bottom, left).
     * The values can be percentages
     */
    @LazyMargin() @Prop() margin?: string;

    /**
     * Thrown as a succesfull request callback. Carries response object
     */
    @Event() resolved: EventEmitter;

    /**
     * Thrown as a failed request callback. Carries response object
     */
    @Event() error: EventEmitter;

    @LazyHost() @Element() el;

    request: Request;

    htmlEl: HTMLElement;

    componentDidLoad() {
        this.request = new Request(this.url);
    }

    @Lazy()
    handleHtml() {
        fetch(this.request)
            .then(response => {
                this.resolved.emit(response);
                response.text().then(html => this.el.innerHTML = html);
            })
            .catch(err => this.error.emit(err));
    }

    render() {
        return (
            <div
                ref={htmlEl => this.htmlEl = htmlEl}
            />
        );
    }
}
