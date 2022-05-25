import {styled} from "@compiled/react";
import {color, padding} from "../../../../global/styles";

export const InputPropElement = styled.div<{ isConnected: boolean; connectedColor: string; color: string; }>`
  border: 1px solid ${() => color.IO.stroke};
  border-radius: 4px;
  text-align: left;
  padding: 0px ${() => padding.node.contentLeft};
  height: 24px;
  line-height: 24px;
  background-color: ${(p) => { return p.isConnected ? p.connectedColor : p.color }};

  & + & {
    margin-top: 4px
  }
`