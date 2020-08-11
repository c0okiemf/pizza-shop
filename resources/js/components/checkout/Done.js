import React, {Component} from "react"
import styled from "styled-components"
import {MOBILE_WIDTH} from "../../app"

const DoneGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 50%);
  place-items: center;

  @media screen and (max-width: ${MOBILE_WIDTH}px) {
    & {
      grid-template-rows: repeat(2,50%);
      grid-template-columns: unset;
    }
  }
`

const DoneImage = styled.img`
  height: 200px;
`

const DoneText = styled.div`
  font-size: 2.5rem;
  font-weight: bold;

   @media screen and (max-width: ${MOBILE_WIDTH}px) {
    & {
      font-size: 1.5rem;
    }
  }
`

class Done extends Component {

    render = () => (
        <DoneGrid>
            <div><DoneImage src="/storage/tick.svg" alt=""/></div>
            <DoneText>Thank you for your order, the courier should arrive any minute now...</DoneText>
        </DoneGrid>
    )

}

export default Done
