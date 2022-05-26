import {styled} from "@compiled/react";
import {color, padding} from "../../../../global/styles";

export const OutputPropElement = styled.div<{ ioSelected: boolean; isConnected: boolean; connectedColor: string; color: string; }>`
  border: 1px solid ${() => color.IO.stroke};
  border-radius: 4px;
  text-align: right;
  padding: 0px ${() => padding.node.contentLeft};
  height: 24px;
  line-height: 24px;
  background-color: ${(p) => { return p.isConnected ? p.connectedColor : p.color }};
  
  transition: all .15s cubic-bezier(0,0,0,1);
  
  & + & {
    margin-top: 4px
  }

  &:hover {
    background-color: ${(p) => {
      if (p.ioSelected) {
        return p.connectedColor;
      }
      if (p.isConnected) {
        return p.connectedColor;
      }
      return p.color;
    }}
  }
`