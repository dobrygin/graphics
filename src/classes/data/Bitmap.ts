import { BitmapChannels, BitmapDepth, BitmapFormat } from '../../types/Bitmap';

export class Bitmap {
  channels: BitmapChannels

  constructor(
    public data: Uint8Array,
    public width: number,
    public height: number,
    public format: BitmapFormat = BitmapFormat.RGBA,
    public depth: BitmapDepth = BitmapDepth.BIT8,
  ) {
    // let dataType;
    //
    // switch (depth) {
    //   case BitmapDepth.BIT8:
    //     dataType = Uint8Array;
    //     break;
    //
    //   case BitmapDepth.BIT16:
    //     dataType = Uint16Array;
    //     break;
    // }
    //
    // this.channels.red = new dataType(width * height);
    // this.channels.green = new dataType(width * height);
    // this.channels.blue = new dataType(width * height);


  }
}
