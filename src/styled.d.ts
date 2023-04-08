import styled from "styled-components";


// import original module declarations
import 'styled-components';


// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    textColor: string;
    bgColor: string;
    accentColor: string;
    boxShadowNone: string;
    boxShadowClick: string;
  }
}