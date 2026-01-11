import { legiKlejona } from "./legiKlejona"
import { legiZeszyt } from "./legiZeszyt"

export const useArkuszeAuto = () =>{

    const autoArk = () => {

      let legi
      // legi = legiZeszyt(4,16)
      legi = legiKlejona(84,16)

      console.log(legi)

        }

    return {autoArk}

}
