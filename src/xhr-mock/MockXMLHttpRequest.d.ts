import { MockFunction, ErrorCallbackEvent } from './types';
import MockXMLHttpRequestEventTarget from './MockXMLHttpRequestEventTarget';
export declare enum ReadyState {
    UNSENT = 0,
    OPENED = 1,
    HEADERS_RECEIVED = 2,
    LOADING = 3,
    DONE = 4,
}
export default class MockXMLHttpRequest extends MockXMLHttpRequestEventTarget implements XMLHttpRequest {
    static readonly UNSENT: ReadyState;
    static readonly OPENED: ReadyState;
    static readonly HEADERS_RECEIVED: ReadyState;
    static readonly LOADING: ReadyState;
    static readonly DONE: ReadyState;
    readonly UNSENT: ReadyState;
    readonly OPENED: ReadyState;
    readonly HEADERS_RECEIVED: ReadyState;
    readonly LOADING: ReadyState;
    readonly DONE: ReadyState;
    onreadystatechange: (this: XMLHttpRequest, ev: Event) => any;
    withCredentials: boolean;
    static handlers: MockFunction[];
    static errorCallback: (event: ErrorCallbackEvent) => void;
    /**
     * Add a mock handler
     */
    static addHandler(fn: MockFunction): void;
    /**
     * Remove a mock handler
     */
    static removeHandler(fn: MockFunction): void;
    /**
     * Remove all request handlers
     */
    static removeAllHandlers(): void;
    private req;
    private res;
    responseType: XMLHttpRequestResponseType;
    responseURL: string;
    private _timeout;
    upload: XMLHttpRequestUpload;
    readyState: ReadyState;
    private isSynchronous;
    private isSending;
    private isUploadComplete;
    private isAborted;
    private isTimedOut;
    private _timeoutTimer;
    timeout: number;
    readonly response: any;
    readonly responseText: string;
    readonly responseXML: Document | null;
    readonly status: number;
    readonly statusText: string;
    getAllResponseHeaders(): string;
    getResponseHeader(name: string): null | string;
    setRequestHeader(name: string, value: string): void;
    overrideMimeType(mime: string): void;
    open(method: string, url: string, async?: boolean, username?: string | null, password?: string | null): void;
    private sendSync();
    private sendAsync();
    private applyNetworkError();
    private reportError(event);
    private sendRequest(req);
    private receiveResponse(res);
    private handleError(error?);
    private handleResponseBody(res);
    send(): void;
    send(body?: any): void;
    abort(): void;
    msCachingEnabled(): boolean;
}
