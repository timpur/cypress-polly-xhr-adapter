import { MockURL } from './MockURL';
import { MockHeaders } from './MockHeaders';
export default class MockRequest {
    private _method;
    private _url;
    private _headers;
    private _body;
    method(): string;
    method(method: string): MockRequest;
    url(): MockURL;
    url(url: string): MockRequest;
    header(name: string): null | string;
    header(name: string, value: string): MockRequest;
    headers(): MockHeaders;
    headers(headers: MockHeaders): MockRequest;
    body(): any;
    body(body: any): MockRequest;
}
