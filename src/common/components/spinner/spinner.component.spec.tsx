import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { usePromiseTracker } from 'react-promise-tracker';
import { SpinnerComponent } from './spinner.component';

vi.mock('react-promise-tracker', () => ({
  usePromiseTracker: vi.fn(),
}));

describe('SpinnerComponent specs', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render and display the loader inside the modal when a promise is in progress.', () => {
    // Arrange
    vi.mocked(usePromiseTracker).mockReturnValue({
      promiseInProgress: true,
    });

    // Act
    render(<SpinnerComponent />);
    const modalElement = screen.getByRole('presentation');

    // Assert
    expect(modalElement).toBeInTheDocument();
  });

  it('should not render anything or the modal should be closed if there are no promises in progress', () => {
    // Arrange
    vi.mocked(usePromiseTracker).mockReturnValue({
      promiseInProgress: false,
    });

    // Act
    render(<SpinnerComponent />);
    const modalElement = screen.queryByRole('presentation');

    // Assert
    expect(modalElement).not.toBeInTheDocument();
  });
});
