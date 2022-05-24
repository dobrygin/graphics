export default function split16BitImageDataTo8BitChunks(data: Uint16Array): [Uint8Array, Uint8Array] {
  const chunk_1 = new Uint8Array(data.length);
  const chunk_2 = new Uint8Array(data.length);

  for (let i = 0; i < data.length; i++) {
    chunk_1[i] = data[i] >> 8 & 0xff;
    chunk_2[i] = data[i] & 0xff;
  }

  return [chunk_1, chunk_2];
}
