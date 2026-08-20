import '@testing-library/jest-dom';
import { cn } from '@/lib/utils';

describe('cn', () => {
  it('merges class names correctly', () => {
    const result = cn('bg-red-500', 'text-white', 'p-4');
    expect(result).toContain('bg-red-500');
    expect(result).toContain('text-white');
    expect(result).toContain('p-4');
  });

  it('handles undefined inputs gracefully', () => {
    const result = cn('base-class', undefined, 'extra-class');
    expect(result).toContain('base-class');
    expect(result).toContain('extra-class');
  });

  it('handles null inputs gracefully', () => {
    const result = cn('base-class', null, 'extra-class');
    expect(result).toContain('base-class');
    expect(result).toContain('extra-class');
  });

  it('handles false/empty inputs gracefully', () => {
    const result = cn('base', false && 'should-not-appear', 'extra');
    expect(result).toContain('base');
    expect(result).toContain('extra');
    expect(result).not.toContain('should-not-appear');
  });

  it('resolves Tailwind conflicting classes via twMerge', () => {
    const result = cn('px-4', 'px-8');
    expect(result).toContain('px-8');
    expect(result).not.toContain('px-4');
  });

  it('resolves multiple conflicting Tailwind classes', () => {
    const result = cn('bg-red-500 text-sm p-2', 'bg-blue-500 text-lg');
    expect(result).toContain('bg-blue-500');
    expect(result).toContain('text-lg');
    expect(result).toContain('p-2');
    expect(result).not.toContain('bg-red-500');
    expect(result).not.toContain('text-sm');
  });

  it('returns empty string for no inputs', () => {
    const result = cn();
    expect(result).toBe('');
  });

  it('handles conditional class objects from clsx', () => {
    const result = cn('base', { active: true, disabled: false });
    expect(result).toContain('base');
    expect(result).toContain('active');
    expect(result).not.toContain('disabled');
  });
});
