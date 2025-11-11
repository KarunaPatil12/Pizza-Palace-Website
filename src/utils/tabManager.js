const TAB_KEY = 'my_app_tab_lock';
const TAB_ID_KEY = 'my_app_tab_id';

function createTabLock(onLockUpdate) {
  const tabId = sessionStorage.getItem(TAB_ID_KEY) || `${Date.now()}-${Math.random()}`;
  sessionStorage.setItem(TAB_ID_KEY, tabId);

  const currentLock = localStorage.getItem(TAB_KEY);

  if (!currentLock || currentLock === tabId) {
    localStorage.setItem(TAB_KEY, tabId);
    onLockUpdate(true);
  } else {
    onLockUpdate(false);
  }

  const handleStorageChange = () => {
    const lock = localStorage.getItem(TAB_KEY);
    onLockUpdate(lock === tabId);
  };

  window.addEventListener('storage', handleStorageChange);

  window.addEventListener('beforeunload', () => {
    const lock = localStorage.getItem(TAB_KEY);
    if (lock === tabId) {
      localStorage.removeItem(TAB_KEY);
    }
  });
}

export default createTabLock;
