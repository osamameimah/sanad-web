export function getRequests() {
  try {
    return JSON.parse(localStorage.getItem('sanad_requests') || '[]');
  } catch {
    return [];
  }
}

export function saveRequests(requests) {
  try {
    localStorage.setItem('sanad_requests', JSON.stringify(requests));
  } catch (error) {
    console.error('Error saving requests:', error);
  }
}