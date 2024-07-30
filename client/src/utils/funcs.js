export const toBase64 = (buffer) => {
  let binary = '';
  let bytes = new Uint8Array(buffer);
  bytes.forEach(byte => {
    binary += String.fromCharCode(byte)
  })
  return window.btoa(binary);
};