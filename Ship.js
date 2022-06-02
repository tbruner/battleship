const ship = (length) => {
  let hits = new Array(length).fill(false);
  const shipLength = length;
  
  const hit = (square) => {
    if(hits[square]) return false;
    hits[square] = true;
    return true;
  }

  const isSunk = () => {
    let i = 0;
    while(i < shipLength) {
      if(!hits[i]) return false;
      i++;
    }

    return true;
  }
  return { hit, isSunk }
}

export { ship }