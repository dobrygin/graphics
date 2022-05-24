import {styled} from "@compiled/react";
import {color, typo} from "../../../global/styles";

export const SliderElement = styled.div`
  width: 100%;
  height: 24px;
  border-radius: 4px;
  background-color: ${() => color.IO.fill};
  overflow: hidden;
  position: relative;
`

export const SliderElementBox = styled.div`
  width: 100%;
  display: flex;
  & + & {
    margin-top: 6px;
  }
`

export const SliderFillElement = styled.div<{ color: string; width: number; }>`
  width: ${(p) => `${p.width * 100}%`};
  height: 100%;
  background-color: ${(p) => p.color};
`

export const SliderValues = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;
  user-select: none;
`

export const SliderValuesTitle = styled.div`
  color: ${() => color.text.white};
  flex: 1;
  height: 100%;
  line-height: 24px;
  padding-left: 4px;
`

export const SliderValuesValue = styled.div`
  color: ${() => color.text.white};
  flex: 1;
  height: 100%;
  line-height: 24px;
  padding-right: 4px;
  text-align: right;
  font-family: ${() => typo.monoFamily};
`

export const SliderInputNumber = styled.input`
  -webkit-appearance: none;
  width: 100%;
  height: 100%;
  font-size: 12px;
  line-height: 24px;
  font-family: ${() => typo.monoFamily};
  border: 0;
  color: ${() => color.text.white};
  padding-left: 4px;
  padding-right: 4px;
  background-color: transparent;
  border-radius: 0;
  outline: none;
`