export async function waitForPaint(times = 1): Promise<void> {
  for (let i = 0; i < times + 1; i++) {
    jest.advanceTimersByTime(1000);
    await Promise.resolve();
  }
}
