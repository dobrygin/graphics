export enum BitmapFormat {
  RGB,
  RGBA,
  R,
  G,
  B
}

export enum BitmapDepth {
  BIT16,
  BIT8
}

export enum BitmapChannel {
  R = 0,
  G = 1,
  B = 2
}

export type BitmapChannels = {
  red: ArrayBufferLike,
  green: ArrayBufferLike,
  blue: ArrayBufferLike,
  alpha?: ArrayBufferLike
};