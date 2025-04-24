/* Fake delay */
export async function sleep(ms = 1_000) {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });
}
