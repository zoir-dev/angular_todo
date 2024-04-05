export async function lazyLoad(delay = 1000) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('Data fetched successfully after ' + delay + ' milliseconds');
    }, delay);
  });
}
