import {styled} from "@compiled/react";

export const IODotElement = styled.div`
  position: absolute;
  left: 0;
  top: 50%;
  transform: translate(-50%, -50%) translateX(-10px);
  width: 8px;
  height: 8px;
  z-index: 4;
  background: var(--io-dot-color);
  border: 1px solid;
  border-color: var(--io-dot-stroke);
  border-radius: 100%;

  transition: all .15s cubic-bezier(0,0,0,1);
`;

export const IODotElementOutput = styled.div`
  position: absolute;
  left: 100%;
  top: 50%;
  transform: translate(-50%, -50%) translateX(10px);
  width: 8px;
  height: 8px;
  z-index: 4;
  background: var(--io-dot-color);
  border: 1px solid;
  border-color: var(--io-dot-stroke);
  border-radius: 100%;

  transition: all .15s cubic-bezier(0,0,0,1);
`;