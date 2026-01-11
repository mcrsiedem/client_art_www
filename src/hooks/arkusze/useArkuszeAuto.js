import { legiKlejona } from "./legiKlejona"
import { legiZeszyt } from "./legiZeszyt"

export const useArkuszeAuto = () =>{

    const autoArk = () => {

      let legi
      // legi = legiZeszyt(4,4)
      legi = legiKlejona(2,2)

      console.log(legi)

        }

    return {autoArk}

}
