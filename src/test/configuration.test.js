import { afterEach, expect, it, vi } from 'vitest';
afterEach(() => { vi.unstubAllEnvs(); vi.resetModules(); });

it('does not contact the movie provider when no key is configured', async () => {
  vi.stubEnv('VITE_TMDB_API_KEY', '');
  const api = (await import('../axios')).default;
  await expect(api.get('/movie/example')).rejects.toThrow('configured');
});

it('stays logged out and rejects sign-in without Firebase configuration', async () => {
  for (const name of ['VITE_FIREBASE_API_KEY', 'VITE_FIREBASE_AUTH_DOMAIN', 'VITE_FIREBASE_PROJECT_ID', 'VITE_FIREBASE_APP_ID']) vi.stubEnv(name, '');
  const firebase = await import('../firebase');
  expect(firebase.firebaseConfigured).toBe(false);
  const callback = vi.fn();
  const unsubscribe = firebase.subscribeToUser(callback);
  expect(callback).toHaveBeenCalledWith(null);
  expect(typeof unsubscribe).toBe('function');
  await expect(firebase.signIn('example@example.com', 'test-password')).rejects.toThrow('configured');
});
