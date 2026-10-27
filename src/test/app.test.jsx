import React from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import userReducer from '../features/userSlice';

const session = vi.hoisted(() => ({ user: null, unsubscribe: vi.fn(), signOut: vi.fn() }));
vi.mock('../firebase', () => ({
  firebaseConfigured: true,
  subscribeToUser: callback => { callback(session.user); return session.unsubscribe; },
  signOutUser: session.signOut,
  signIn: vi.fn(), registerAccount: vi.fn(),
}));
vi.mock('../axios', () => ({ default: { get: vi.fn().mockResolvedValue({ data: { results: [] } }) } }));
import App from '../App';

beforeEach(() => { session.user = null; session.unsubscribe.mockClear(); session.signOut.mockReset().mockResolvedValue(); });

function mount() {
  const store = configureStore({ reducer: { user: userReducer } });
  return render(<Provider store={store}><App /></Provider>);
}

describe('authentication and browser routes', () => {
  it('opens the sign-in form for a logged-out visitor', () => {
    mount();
    fireEvent.click(screen.getByRole('button', { name: 'Sign In' }));
    expect(screen.getByPlaceholderText('Your Email')).not.toBeNull();
    expect(screen.getByPlaceholderText('Your Password')).not.toBeNull();
  });
  it('renders the profile and calls the sign-out action', async () => {
    session.user = { uid: 'test-user', email: 'example@example.com' };
    window.history.replaceState({}, '', '/profile');
    mount();
    expect(await screen.findByText('example@example.com')).not.toBeNull();
    fireEvent.click(screen.getByRole('button', { name: 'Sign Out' }));
    expect(session.signOut).toHaveBeenCalledOnce();
  });
  it('navigates from the profile to the catalog', async () => {
    session.user = { uid: 'test-user', email: 'example@example.com' };
    window.history.replaceState({}, '', '/profile');
    mount();
    fireEvent.click(await screen.findByAltText('Home'));
    expect(await screen.findByRole('heading', { name: 'Netflix Originals' })).not.toBeNull();
  });
  it('unsubscribes from authentication on unmount', () => {
    const view = mount();
    view.unmount();
    expect(session.unsubscribe).toHaveBeenCalledOnce();
  });
});
