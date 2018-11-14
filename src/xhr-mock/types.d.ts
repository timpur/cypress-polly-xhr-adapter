import { MockHeaders } from './MockHeaders';
import MockRequest from './MockRequest';
import MockResponse from './MockResponse';
export declare type MockHeaders = {
    [name: string]: string;
};
export declare type MockObject = {
    status?: number;
    reason?: string;
    headers?: MockHeaders;
    body?: any;
};
export declare type MockFunction = (request: MockRequest, response: MockResponse) => undefined | MockResponse | Promise<undefined | MockResponse>;
export declare type Mock = MockObject | MockFunction;
export interface ErrorCallbackEvent {
    req: MockRequest;
    err: Error;
}
