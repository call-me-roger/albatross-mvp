export function _callback(functionHandler, args) {
  if (typeof functionHandler === 'function') functionHandler(args)
}
