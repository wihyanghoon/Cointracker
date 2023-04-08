import { DefaultTheme } from "styled-components"


export const darkTheme: DefaultTheme = {
    bgColor : "#2f3640",
    textColor : "#ffffff",
    accentColor: "#0092E7",
    boxShadowNone: "10px 10px 30px #282e36, -10px -10px 30px #363e4a",
    boxShadowClick: "inset 10px 10px 30px #282e36, inset -10px -10px 30px #363e4a;"
}

export const lightTheme: DefaultTheme = {
    bgColor : "whitesmoke",
    textColor : "#000000",
    accentColor: "#F86866",
    boxShadowNone: "10px 10px 30px #d9d9d9, -10px -10px 30px #ffffff",
    boxShadowClick: "inset 10px 10px 30px #d9d9d9, inset -10px -10px 30px #ffffff;"
}