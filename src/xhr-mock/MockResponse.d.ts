import { MockHeaders } from './MockHeaders';
export default class MockResponse {
    private _status;
    private _reason;
    private _headers;
    private _body;
    status(): number;
    status(status: number): MockResponse;
    reason(): string;
    reason(reason: string): MockResponse;
    statusText(): null | string;
    statusText(reason: string): MockResponse;
    header(name: string): null | string;
    header(name: string, value: string): MockResponse;
    headers(): MockHeaders;
    headers(headers: MockHeaders): MockResponse;
    body(): any;
    body(body: any): MockResponse;
}
