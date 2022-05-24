import {styled} from "@compiled/react";

export const Group = styled.div`
  overflow: auto;
  
  & + & {
    margin-top: 6px;
  }
  
  & & {
    margin-top: 6px;
  }
`