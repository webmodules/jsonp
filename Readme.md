
# jsonp

A simple JSONP implementation.

## API

### jsonp(url, opts, fn)

- `url` (`String`) url to fetch
- `opts` (`Object`), optional
  - `param` (`String`) name of the query string component to specify
    the callback (defaults to `callback`)
  - `timeout` (`Number`) how long after a timeout error is emitted. `0` to
    disable (defaults to `60000`)
- `fn` callback

The callback is called with `err, data` parameters. 

If it times out, the `err` will be an `Error` object whose `message` is
`Timeout`.

## License

MIT
