import MockEventTarget from './MockEventTarget';
export default class MockXMLHttpRequestEventTarget extends MockEventTarget implements XMLHttpRequestEventTarget {
    onabort: (this: XMLHttpRequestEventTarget, ev: ProgressEvent) => any;
    onerror: (this: XMLHttpRequestEventTarget, ev: ProgressEvent) => any;
    onload: (this: XMLHttpRequestEventTarget, ev: ProgressEvent) => any;
    onloadend: (this: XMLHttpRequestEventTarget, ev: ProgressEvent) => any;
    onloadstart: (this: XMLHttpRequestEventTarget, ev: ProgressEvent) => any;
    onprogress: (this: XMLHttpRequestEventTarget, ev: ProgressEvent) => any;
    ontimeout: (this: XMLHttpRequestEventTarget, ev: ProgressEvent) => any;
}
