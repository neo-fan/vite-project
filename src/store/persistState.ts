let persistReady = false;
let persistReadyPromise: Promise<void> | null = null;

export function setPersistReady() {
  persistReady = true;
}

export function isPersistReady() {
  return persistReady;
}

export function waitForPersist(): Promise<void> {
  if (persistReady) {
    return Promise.resolve();
  }
  
  if (!persistReadyPromise) {
    persistReadyPromise = new Promise((resolve) => {
      const checkInterval = setInterval(() => {
        if (persistReady) {
          clearInterval(checkInterval);
          resolve();
        }
      }, 50); // 每 50ms 检查一次
      
      // 超时保护（5秒后强制放行）
      setTimeout(() => {
        clearInterval(checkInterval);
        console.warn("等待 Persist 恢复超时");
        resolve();
      }, 5000);
    });
  }
  
  return persistReadyPromise;
}