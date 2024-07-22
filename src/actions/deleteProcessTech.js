export function deleteProcessTech(
  row,
  procesyElementowTechTemporary,
  setProcesyElementowTechTemporary
) {
  // const procesyElementowEditTemporary = procesyElementowTechTemporary.slice();
  // procesyElementowEditTemporary.filter((p) => p.id == row.id);
  // procesyElementowEditTemporary.sort((a, b) => a.indeks - b.indeks);
console.log("procesy ", procesyElementowTechTemporary)
console.log("proces_id "+ row.id)
   setProcesyElementowTechTemporary(procesyElementowTechTemporary.filter((p) => p.id !== row.id));
}
