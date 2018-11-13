import { MockFunction } from './types';
import MockRequest from './MockRequest';
import MockResponse from './MockResponse';
export declare function sync(handlers: MockFunction[], request: MockRequest, response: MockResponse): MockResponse;
export declare function async(handlers: MockFunction[], request: MockRequest, response: MockResponse): Promise<MockResponse>;
