export function parseENSAddress(address) {
  if (!address) return ''
  const splitAddressA = address.substr(0, 6)
  const splitAddressB = address.substr(address.length - 4)
  return `${splitAddressA}...${splitAddressB}`
}
