import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useConfirmationDialog } from './confirmation-dialog.hook';

const mockEmptyLookup = { id: '', name: '' };
vi.mock('./model', () => ({
  createEmptyLookup: () => mockEmptyLookup,
}));

describe('useConfirmationDialog specs', () => {
  it('should return the initial default values', () => {
    // Act
    const { result } = renderHook(() => useConfirmationDialog());

    // Assert
    expect(result.current.isOpen).toBe(false);
    expect(result.current.itemToDelete).toEqual(mockEmptyLookup);
    expect(result.current.onAccept).toEqual(expect.any(Function));
    expect(result.current.onClose).toEqual(expect.any(Function));
    expect(result.current.onOpenDialog).toEqual(expect.any(Function));
  });

  it('should open the dialog and save the item to delete when onOpenDialog is called', () => {
    // Arrange
    const itemMock = { id: '1', name: 'Item 1' };
    const { result } = renderHook(() => useConfirmationDialog());

    // Act
    act(() => {
      result.current.onOpenDialog(itemMock);
    });

    // Assert
    expect(result.current.isOpen).toBe(true);
    expect(result.current.itemToDelete).toEqual(itemMock);
  });

  it('should close the dialog and keep isOpen as false when onClose is called', () => {
    // Act
    const { result } = renderHook(() => useConfirmationDialog());
    act(() => {
      result.current.onOpenDialog({ id: '1', name: 'Item 1' });
    });

    // Assert
    expect(result.current.isOpen).toBe(true);

    // Act
    act(() => {
      result.current.onClose();
    });

    // Assert
    expect(result.current.isOpen).toBe(false);
  });

  it('should reset the itemToDelete when onAccept is called', () => {
    // Arrange
    const itemMock = { id: '2', name: 'Item 1' };

    // Act
    const { result } = renderHook(() => useConfirmationDialog());
    act(() => {
      result.current.onOpenDialog(itemMock);
    });
    // Assert
    expect(result.current.itemToDelete).toEqual(itemMock);

    // Act
    act(() => {
      result.current.onAccept();
    });

    // Assert
    expect(result.current.itemToDelete).toEqual(mockEmptyLookup);
  });
});
