import { styled } from "@compiled/react";
import {color, padding} from "../../../../global/styles";

export const NodeElement = styled.div`
  margin-top: 8px;
  margin-left: 8px;
    //height: 100px;
    background-color: ${color.nodes.fill};
    border: 1px solid ${color.nodes.stroke};
    min-width: 195px;
    width: 195px;
    border-radius: 5px 5px 5px 5px;
`;

export const NodeElementHeader = styled.div`
    width: 100%;
    height: 23px;
    border-radius: 4px 4px 0 0;
    background-color: ${color.nodes.math};
    padding-left: 2px;
    box-sizing: border-box;
  display: flex;
`

export const NodeElementHeaderTitle = styled.div`
    width: 100%;
    height: 100%;
    line-height: 23px;
`

export const NodeElementHeaderIcon = styled.div`
  padding-right: 2px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const NodeElementContent = styled.div`
  padding-left: ${padding.node.contentLeft};
  padding-right: ${padding.node.contentRight};
  padding-top: ${padding.node.contentTop};
  padding-bottom: ${padding.node.contentTop};
`