import { useCookies } from "react-cookie";
// funkcja wyciąga pola obiektu zapisanego w tokenie JWT

export default  function DecodeToken(token) {
    //wyciaga payload z tokenu
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  }

//   function DecodeToken() {
//     const [cookies, setCookie] = useCookies();
//     //wyciaga payload z tokenu
//     var base64Url = cookies.token.split(".")[1];
//     var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
//     var jsonPayload = decodeURIComponent(
//       window
//         .atob(base64)
//         .split("")
//         .map(function (c) {
//           return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
//         })
//         .join("")
//     );

//     return JSON.parse(jsonPayload);
//   }