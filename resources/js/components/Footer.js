import React from "react"
import styled from "styled-components"
import {StyledImage} from "./Header"


const StyledFooter = styled.div`
  grid-column: 1 / 4;
  background: black;
  min-height: 200px;
  display: grid;
  grid-row: 3;
`

const Links = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit,minmax(40px,100px));
  grid-gap: 2vw;
  min-width: 200px;
  max-width: 650px;
  padding: 0 2vw 2vh 0;
  place-self: end;
`

const LinkImage = styled(StyledImage)`
  object-fit: contain;
  width: 80px;
  height: 80px;
`

const Footer = () => (
    <StyledFooter>
        <Links>
            <a href="https://findharry.com/" target="_blank">
                <LinkImage src="/storage/site.png" />
            </a>
            <a href="https://www.linkedin.com/in/pichugin-igor/" target="_blank">
                <LinkImage src="/storage/linkedin.png" />
            </a>
            <a href="https://github.com/c0okiemf" target="_blank">
                <LinkImage src="/storage/github.png" />
            </a>
        </Links>
    </StyledFooter>
)

export default Footer
