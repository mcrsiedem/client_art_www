import { legiKlejona } from "./legiKlejona"
import { legiZeszyt } from "./legiZeszyt"

export const useArkuszeAuto = () =>{

    const autoArk = () => {

      let legi
      // legi = legiZeszyt(4,4)
      // legi = legiKlejona(106,16)
      legi = legiZeszyt(106,16)

      console.log(legi)

        }

    return {autoArk}

}
