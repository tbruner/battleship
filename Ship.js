const Ship = (length) => {
  let hits = 0;
  
  const hit = () => {
    hits++;
  }

  const isSunk = () => {
    if(hits >= length) return true;

    return false;
  }
  return {length, hit, isSunk}
}

export { Ship }