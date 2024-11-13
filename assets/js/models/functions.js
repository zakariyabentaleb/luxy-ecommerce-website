
// store to panie
function addToPanie(id) {
  let panie = localStorage.getItem("panie");

  if (panie) {
    panie = JSON.parse(panie);
  } else {
    panie = [];
  }

  if (!panie.includes(id)) {
    panie.push(id);
    localStorage.setItem("panie", JSON.stringify(panie));
  } else {
    console.log("Product already in cart");
  }
}
// store to favis

function addToFavi(id) {
  let favi = localStorage.getItem("favi");

  if (favi) {
    favi = JSON.parse(favi);
  } else {
    favi = [];
  }

  if (!favi.includes(id)) {
    favi.push(id);
    localStorage.setItem("favi", JSON.stringify(favi));
  } else {
    console.log("Product already in favi");
  }
}



export {addToPanie,addToFavi}