import MockEvent from './MockEvent';
export default class MockProgressEvent extends MockEvent implements ProgressEvent {
    readonly lengthComputable: boolean;
    readonly loaded: number;
    readonly total: number;
    constructor(type: string, eventInitDict?: ProgressEventInit);
    initProgressEvent(typeArg: string, canBubbleArg: boolean, cancelableArg: boolean, lengthComputableArg: boolean, loadedArg: number, totalArg: number): void;
}
