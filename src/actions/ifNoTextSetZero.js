
export function ifNoTextSetZero(value){

    if(value == '' ^ value == null) {
        return 0
      } else {
        return value
      }
}
