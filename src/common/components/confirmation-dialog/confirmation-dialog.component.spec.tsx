import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';

describe('ConfirmationDialogComponent specs', () => {
  // Arrange
  const defaultProps: React.ComponentProps<typeof ConfirmationDialogComponent> =
    {
      isOpen: true,
      title: 'Confirmation Dialog',
      labels: {
        closeButton: 'Cancel',
        acceptButton: 'Accept',
      },
      onAccept: vi.fn(),
      onClose: vi.fn(),
      children: <p>Content</p>,
    };
  it('should render the dialog with the title, content, and buttons when isOpen is true', () => {
    // Act
    render(
      <ConfirmationDialogComponent
        {...defaultProps}
      ></ConfirmationDialogComponent>
    );

    // Assert
    expect(screen.getByText('Confirmation Dialog')).toBeInTheDocument();

    expect(screen.getByText('Content')).toBeInTheDocument();

    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Accept' })).toBeInTheDocument();
  });

  it('should not render the dialog when isOpen is false', () => {
    // Act
    render(
      <ConfirmationDialogComponent
        {...defaultProps}
        isOpen={false}
      ></ConfirmationDialogComponent>
    );

    // Assert
    expect(screen.queryByText('Confirmation Dialog')).not.toBeInTheDocument();
    expect(screen.queryByText('Content')).not.toBeInTheDocument();
  });

  it('should call onClose when the close button is clicked', async () => {
    // Arrange
    const user = userEvent.setup();

    // Act
    render(
      <ConfirmationDialogComponent
        {...defaultProps}
      ></ConfirmationDialogComponent>
    );

    const closeButton = screen.getByRole('button', { name: 'Cancel' });
    await user.click(closeButton);

    // Assert
    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
  });

  it('should call onAccept and then onClose when the accept button is clicked', async () => {
    // Arrange
    const user = userEvent.setup();
    const onCloseMock = vi.fn(); // lo pongo para no reiniciar el mock de onClose en defaultProps y que no afecte a otros tests

    // Act
    render(
      <ConfirmationDialogComponent
        {...defaultProps}
        onClose={onCloseMock}
      ></ConfirmationDialogComponent>
    );

    const acceptButton = screen.getByRole('button', { name: 'Accept' });
    await user.click(acceptButton);

    // Assert
    expect(defaultProps.onAccept).toHaveBeenCalledTimes(1);
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it('must support React nodes as the title', () => {
    // Arrange
    const customTitle = (
      <span data-testid="custom-title">Personalized Title</span>
    );
    // Act
    render(
      <ConfirmationDialogComponent
        {...defaultProps}
        title={customTitle}
      ></ConfirmationDialogComponent>
    );
    // Assert
    expect(screen.getByTestId('custom-title')).toBeInTheDocument();
    expect(screen.getByText('Personalized Title')).toBeInTheDocument();
  });
});
