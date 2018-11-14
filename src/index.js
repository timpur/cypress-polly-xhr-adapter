import { XHRMock } from '../xhr-mock/XHRMock'
import Adapter from '@pollyjs/adapter'
import { XHR as XHRUtils } from '@pollyjs/utils'

const IS_STUBBED = Symbol()

let window = global.window

export default class XHRAdapter extends Adapter {
  static get name() {
    return 'xhr'
  }
  static setWindow(_window) {
    window = _window
  }

  constructor(polly) {
    super(polly)
    this.xhrMock = new XHRMock(window)
  }

  onConnect() {
    this.assert(
      'Running concurrent XHR adapters is unsupported, stop any running Polly instances.',
      !global.XMLHttpRequest[IS_STUBBED]
    )

    this.xhrMock.setup()
    global.XMLHttpRequest[IS_STUBBED] = true

    this.xhrMock.use(async (req, res) => {
      await this.handleRequest({
        url: req.url().toString(),
        method: req.method() || 'GET',
        headers: req.headers(),
        requestArguments: { req, res },
        body: req.body()
      })
      return res
    })
  }

  onDisconnect() {
    delete global.XMLHttpRequest[IS_STUBBED]
    this.xhrMock.teardown()
  }

  async onRecord(pollyRequest) {
    await this.passthroughRequest(pollyRequest)
    await this.persister.recordRequest(pollyRequest)
    this.respondToXhr(pollyRequest)
  }

  async onReplay(pollyRequest, { statusCode, headers, body }) {
    await pollyRequest.respond(statusCode, headers, body)
    this.respondToXhr(pollyRequest)
  }

  async onPassthrough(pollyRequest) {
    await this.passthroughRequest(pollyRequest)
    this.respondToXhr(pollyRequest)
  }

  async onIntercept(pollyRequest, { statusCode, headers, body }) {
    await pollyRequest.respond(statusCode, headers, body)
    this.respondToXhr(pollyRequest)
  }

  respondToXhr(pollyRequest) {
    const { res } = pollyRequest.requestArguments
    const {
      response: { statusCode, headers, body }
    } = pollyRequest

    for (const header in headers) res.header(header, headers[header])
    res.status(statusCode).body(body)
  }

  async passthroughRequest(pollyRequest) {
    const xhr = new this.xhrMock.RealXMLHttpRequest()
    xhr.open(pollyRequest.method, pollyRequest.url, true)

    for (const h in pollyRequest.headers) {
      xhr.setRequestHeader(h, pollyRequest.headers[h])
    }

    await this.resolveXhr(xhr, pollyRequest.body)
    await pollyRequest.respond(
      xhr.status,
      XHRUtils.serializeResponseHeaders(xhr.getAllResponseHeaders()),
      xhr.responseText
    )
  }

  resolveXhr(xhr, body) {
    return new Promise(resolve => {
      xhr.send(body)
      const { onreadystatechange } = xhr

      xhr.onreadystatechange = (...args) => {
        onreadystatechange && onreadystatechange.apply(xhr, ...args)
        xhr.readyState === XMLHttpRequest.DONE && resolve()
      }
    })
  }
}
