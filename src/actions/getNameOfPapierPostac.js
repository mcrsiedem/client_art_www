export function getNameOfPapierPostac(listaPapierowPostac, id) {
  let postac = listaPapierowPostac?.filter((x) => x.id == id)[0]?.postac || "";
  return postac;
}
