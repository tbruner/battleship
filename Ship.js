const ship = (length) => {
  let hits = new Array(length).fill(false);
  
  const hit = (square) => {
    if(hits[square]) return false;
    hits[square] = true;
    return true;
  }

  const isSunk = () => {
    let i = 0;
    while(i < length) {
      if(!hits[i]) return false;
      i++;
    }

    return true;
  }
  return { length, hit, isSunk }
}

export { ship }