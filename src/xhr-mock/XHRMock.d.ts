import { Mock, MockFunction, ErrorCallbackEvent } from './types';
export declare class XHRMock {
    RealXMLHttpRequest: {
        new (): XMLHttpRequest;
    };
    setup(): XHRMock;
    teardown(): XHRMock;
    reset(): XHRMock;
    error(callback: (event: ErrorCallbackEvent) => void): XHRMock;
    mock(fn: MockFunction): XHRMock;
    mock(method: string, url: string | RegExp, mock: Mock): XHRMock;
    use(fn: MockFunction): XHRMock;
    use(method: string, url: string | RegExp, mock: Mock): XHRMock;
    get(url: string | RegExp, mock: Mock): XHRMock;
    post(url: string | RegExp, mock: Mock): XHRMock;
    put(url: string | RegExp, mock: Mock): XHRMock;
    patch(url: string | RegExp, mock: Mock): XHRMock;
    delete(url: string | RegExp, mock: Mock): XHRMock;
}
declare const _default: XHRMock;
export default _default;
