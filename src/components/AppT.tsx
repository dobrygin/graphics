import React, { FC, useEffect, useRef } from 'react';
import { decode as tiffDecode  } from 'tiff';
import split16BitImageDataTo8BitChunks from '../utils/split16BitImageDataTo8BitChunks';
import { encode } from 'fast-png';
import { Bitmap } from '../classes/data/Bitmap';
import { Image } from '../classes/nodes/input/Image';
import { Container, Renderer, Sprite, Texture } from 'pixi.js';
import { BCS } from '../classes/nodes/colorCorrection/BCS';
import { OutputNode } from '../classes/Node';
import BitmapOutput from '../classes/IO/Bitmap/BitmapOutput';

import * as PIXI from 'pixi.js';

export const AppT: FC<{}> = () => {

  const ref = useRef(null);

  useEffect(() => {
    if (!ref) return;
    //
    // const renderer = new Renderer({
    //   width: 2,
    //   height: 2,
    //   backgroundAlpha: 0,
    //   view: ref.current,
    // });
    //
    // const container = new Container();
    //
    // const ll = Texture.fromBuffer(new Uint8Array([255,0,0,255,0,0,0,0,0,0,0,255,0,0,0,255]), 2, 2, {
    //   format: FORMATS.RGBA
    // })
    //
    // const sprite = Sprite.from(ll);
    //
    // container.addChild(sprite);
    //
    // renderer.render(container);
    //
    // return () => {};
    // const stage = new PIXI.Container();

    // const baseTex = new PIXI.BaseTexture();

    const tex = Texture.fromURL('https://loremflickr.com/100/100').then(tex => {
      const img = Sprite.from(tex);

      const stage = new Container();

      const renderer = new Renderer({
        width: 2048,
        height: 2048,
        transparent: true,
        view: ref.current
      })

      stage.addChild(img);

      //
      img.x = 0;
      img.y = 0;
      img.width = 2048;
      img.height = 2048;

      // stage.addChild(img);
      //
      // img.anchor.set(0.5);





      fetch('./example_2.tif').then(res => res.arrayBuffer()).then(async (arrayBuf) => {
        const decodedTiff = (tiffDecode(arrayBuf, { onlyFirst: true }))[0];

        if (decodedTiff.data instanceof Uint16Array) {
          const [part, bytes_2] = split16BitImageDataTo8BitChunks(decodedTiff.data);

          let bytes_1 = part;

          if (!decodedTiff.alpha) {
            let newBytes = new Uint8Array(decodedTiff.width * decodedTiff.height * 4);
            for (let i = 0; i < bytes_1.length; i++) {
              newBytes[i + Math.floor(i / 3)] = bytes_1[i];
            }
            for (let i = 0; i < newBytes.length; i++) {
              if ((i + 1) % 4 === 0) {
                newBytes[i] = 255;
              }
            }
            bytes_1 = newBytes;
          }

          const output = new OutputNode();
          const inputImg = new Image();

          inputImg.bitmap.setBitmap(new Bitmap(bytes_1, decodedTiff.width, decodedTiff.height))

          const bcs = new BCS();

          output.input.connectTo(bcs.output);
          inputImg.bitmap.connectTo(bcs.image);

          // const a = await output.requestProcessing();

          // @ts-ignore
          window.output = output;
          // @ts-ignore
          window.bcs = bcs;
          // @ts-ignore
          window.inputImg = inputImg;

          if (output.input.connectedTo instanceof BitmapOutput && output.input.connectedTo.bitmap) {
            if (output.input.connectedTo.bitmap instanceof Bitmap) {
              const aaa = encode({
                data: output.input.connectedTo.bitmap.data,
                width: output.input.connectedTo.bitmap.width,
                height: output.input.connectedTo.bitmap.height,
                channels: 4,
              })
              // console.log();
              // downloadBlob(new Blob([aaa]), 'output.png')
            }
          }

          // @ts-ignore
          window.PIXI = PIXI;
        }

      })
    });
  }, [ref])
  return <div>lol?<canvas style={{}} ref={ref}></canvas></div>;
}
