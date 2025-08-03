import DecodeToken from "pages/Login/DecodeToken";

export function UPRAWNIENIE(){

        return  DecodeToken(sessionStorage.getItem("token"))


}
