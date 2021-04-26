export function takeNRandom<T>(arr: T[], num: number) {
  const shuffle = () => Math.random() - 0.5;
  // create a clone of the array so we do not modify the original
  return Array(arr.length)
    .fill(0)
    .map((a, i) => a + i)
    .sort(shuffle)
    .slice(0, num);
}

export function takeSingleRandom<T>(arr: T[]) {
  return takeNRandom(arr, 1)[0];
}
