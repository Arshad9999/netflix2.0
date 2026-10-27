import React from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
vi.mock('../axios', () => ({ default: { get: vi.fn() } }));
import api from '../axios';
import Banner from '../Banner';
import Row from '../Row';

beforeEach(() => { api.get.mockReset(); });

describe('catalog failures and boundary cases', () => {
  it('shows the only available banner rather than selecting index -1', async () => {
    api.get.mockResolvedValue({ data: { results: [{ id: 1, original_name: 'Only Movie', overview: 'Example' }] } });
    render(<Banner />);
    expect(await screen.findByRole('heading', { name: 'Only Movie' })).not.toBeNull();
  });
  it('handles an empty catalog without a broken banner image', async () => {
    api.get.mockResolvedValue({ data: { results: [] } });
    const { container } = render(<Banner />);
    expect(await screen.findByRole('heading', { name: 'Movie catalog' })).not.toBeNull();
    expect(container.querySelector('header').style.backgroundImage).toBe('');
  });
  it('handles a rejected banner request', async () => {
    api.get.mockRejectedValue(new Error('offline'));
    render(<Banner />);
    expect((await screen.findByRole('status')).textContent).toContain('unavailable');
  });
  it('handles missing movie-list results', async () => {
    api.get.mockResolvedValue({ data: {} });
    const { container } = render(<Row title="Examples" fetchURL="/example" />);
    expect(await screen.findByRole('heading', { name: 'Examples' })).not.toBeNull();
    expect(container.querySelectorAll('img')).toHaveLength(0);
  });
  it('handles a rejected movie-list request', async () => {
    api.get.mockRejectedValue(new Error('offline'));
    render(<Row title="Examples" fetchURL="/example" />);
    expect((await screen.findByRole('status')).textContent).toContain('unavailable');
  });
});
