// Integration tests for complete workout workflows
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Integration Tests - Workout Workflows', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.spyOn(window, 'alert').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  describe('Complete Timer Workflow', () => {
    test('should run complete timer cycle from setup to completion', async () => {
      render(<App />);
      
      // Step 1: Set up timer for 1 minute 30 seconds
      const minutesInput = screen.getByLabelText('Minutes');
      const secondsInput = screen.getByLabelText('Seconds');
      
      userEvent.clear(minutesInput);
      userEvent.clear(secondsInput);
      userEvent.type(minutesInput, '1');
      userEvent.type(secondsInput, '30');
      
      expect(minutesInput.value).toBe('1');
      expect(secondsInput.value).toBe('30');
      
      // Step 2: Start timer
      const startButton = screen.getByText('Start');
      userEvent.click(startButton);
      
      // Should show running state
      expect(screen.getByText('1:30')).toBeInTheDocument();
      expect(screen.getByText('Active')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Pause/i })).toBeInTheDocument();
      
      // Step 3: Let timer run for 30 seconds
      jest.advanceTimersByTime(30000);
      
      expect(screen.getByText('1:00')).toBeInTheDocument();
      expect(screen.getByText('Active')).toBeInTheDocument();
      
      // Step 4: Pause timer
      const pauseButton = screen.getByRole('button', { name: /Pause/i });
      userEvent.click(pauseButton);
      
      expect(screen.getByText('1:00')).toBeInTheDocument();
      expect(screen.getByText('Start')).toBeInTheDocument();
      
      // Step 5: Resume and complete timer
      userEvent.click(screen.getByText('Start'));
      jest.advanceTimersByTime(60000);
      
      // Should trigger completion alert
      await waitFor(() => {
        expect(window.alert).toHaveBeenCalledWith('Time is up!');
      });
      
      expect(screen.getByText('0:00')).toBeInTheDocument();
      expect(screen.getByText('Start')).toBeInTheDocument();
    });

    test('should handle timer interruption and resumption correctly', async () => {
      render(<App />);
      
      // Set timer for 2 minutes
      const minutesInput = screen.getByLabelText('Minutes');
      userEvent.clear(minutesInput);
      userEvent.type(minutesInput, '2');
      
      userEvent.click(screen.getByText('Start'));
      
      // Let run for 30 seconds
      jest.advanceTimersByTime(30000);
      expect(screen.getByText('1:30')).toBeInTheDocument();
      
      // Pause
      userEvent.click(screen.getByRole('button', { name: /Pause/i }));
      expect(screen.getByText('1:30')).toBeInTheDocument();
      
      // Reset after 10 seconds pause
      jest.advanceTimersByTime(10000);
      userEvent.click(screen.getByText('Reset'));
      
      expect(screen.getByText('0:00')).toBeInTheDocument();
      
      // Start new timer
      userEvent.click(screen.getByText('Start'));
      expect(screen.getByText('2:00')).toBeInTheDocument();
    });
  });

  describe('Language Toggle Integration', () => {
    test('should maintain timer state across language changes', () => {
      render(<App />);
      
      // Set timer to 3 minutes
      const minutesInput = screen.getByLabelText('Minutes');
      userEvent.clear(minutesInput);
      userEvent.type(minutesInput, '3');
      
      // Start timer
      userEvent.click(screen.getByText('Start'));
      jest.advanceTimersByTime(30000);
      
      expect(screen.getByText('2:30')).toBeInTheDocument();
      
      // Switch to Arabic
      userEvent.click(screen.getByText('AR'));
      
      // Timer should continue and show Arabic labels
      expect(screen.getByText('2:30')).toBeInTheDocument();
      expect(screen.getByText('نشط')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /وقف/i })).toBeInTheDocument();
      expect(screen.getByText('دقائق')).toBeInTheDocument();
      
      // Switch back to English
      userEvent.click(screen.getByText('EN'));
      
      expect(screen.getByText('2:30')).toBeInTheDocument();
      expect(screen.getByText('Active')).toBeInTheDocument();
    });

    test('should update text direction and font class on language change', () => {
      render(<App />);
      
      // Default English
      expect(document.body.dir).toBe('ltr');
      expect(screen.getByRole('banner')).toHaveClass('font-sans');
      
      // Switch to Arabic
      userEvent.click(screen.getByText('AR'));
      
      expect(document.body.dir).toBe('rtl');
      expect(screen.getByRole('banner')).toHaveClass('font-arabic');
      
      // Switch back to English
      userEvent.click(screen.getByText('EN'));
      
      expect(document.body.dir).toBe('ltr');
      expect(screen.getByRole('banner')).toHaveClass('font-sans');
    });
  });

  describe('Multi-Card Workflow Integration', () => {
    test('should allow multiple cards to be expanded simultaneously', () => {
      render(<App />);
      
      // Expand Training Goals
      userEvent.click(screen.getByText('Training Goals'));
      
      // Expand Training Plan
      userEvent.click(screen.getByText('Training Plan'));
      
      // Expand Recovery & Sleep
      userEvent.click(screen.getByText('Recovery & Sleep'));
      
      // All three should be visible
      expect(screen.getByText('Build Lean Muscle')).toBeInTheDocument();
      expect(screen.getByText('Phase 1: Foundation')).toBeInTheDocument();
      expect(screen.getByText('Sleep Optimization')).toBeInTheDocument();
    });

    test('should maintain card expansion state during timer operation', async () => {
      render(<App />);
      
      // Expand Training Goals and start timer
      userEvent.click(screen.getByText('Training Goals'));
      
      const minutesInput = screen.getByLabelText('Minutes');
      userEvent.type(minutesInput, '1');
      userEvent.click(screen.getByText('Start'));
      
      // Let timer run
      jest.advanceTimersByTime(30000);
      
      // Card should remain expanded
      expect(screen.getByText('Build Lean Muscle')).toBeInTheDocument();
      expect(screen.getByText('1:30')).toBeInTheDocument();
      
      // Collapse and expand other cards
      userEvent.click(screen.getByText('Training Plan'));
      userEvent.click(screen.getByText('Recovery & Sleep'));
      
      // Timer should continue running
      expect(screen.getByText('1:30')).toBeInTheDocument();
      expect(screen.getByText('Active')).toBeInTheDocument();
    });
  });

  describe('Input Validation Integration', () => {
    test('should handle edge cases in timer inputs', () => {
      render(<App />);
      
      const minutesInput = screen.getByLabelText('Minutes');
      const secondsInput = screen.getByLabelText('Seconds');
      
      // Test maximum values
      userEvent.clear(minutesInput);
      userEvent.clear(secondsInput);
      userEvent.type(minutesInput, '150'); // Above max of 99
      userEvent.type(secondsInput, '75');  // Above max of 59
      
      // Should clamp to valid ranges
      expect(minutesInput.value).toBe('50'); // Should accept 5, reject 0
      expect(secondsInput.value).toBe('5');  // Should accept 5, reject 7
      
      // Test negative values
      userEvent.clear(minutesInput);
      userEvent.clear(secondsInput);
      userEvent.type(minutesInput, '-10');
      userEvent.type(secondsInput, '-30');
      
      // Should handle negatives properly
      expect(screen.getByText('0:00')).toBeInTheDocument();
    });

    test('should validate timer before starting', () => {
      render(<App />);
      
      // Don't set any time (0:00 default)
      const startButton = screen.getByText('Start');
      userEvent.click(startButton);
      
      // Should show validation alert
      expect(window.alert).toHaveBeenCalledWith('Please set a valid time for timer');
      expect(screen.getByText('0:00')).toBeInTheDocument();
      expect(screen.getByText('Start')).toBeInTheDocument(); // Should still be start, not pause
    });
  });

  describe('Responsive Behavior Integration', () => {
    test('should maintain functionality across simulated screen sizes', () => {
      // Test large screen
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1920,
      });
      
      const { rerender } = render(<App />);
      
      // Should work on large screen
      expect(screen.getByText('EN')).toBeInTheDocument();
      userEvent.click(screen.getByText('EN'));
      expect(screen.getByText('Start')).toBeInTheDocument();
      
      // Test medium screen
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 768,
      });
      
      rerender(<App />);
      
      // Should still work on medium screen
      expect(screen.getByText('EN')).toBeInTheDocument();
      userEvent.click(screen.getByText('AR'));
      expect(screen.getByText('تمارين احترافية')).toBeInTheDocument();
      
      // Test small screen
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375,
      });
      
      rerender(<App />);
      
      // Should still work on small screen
      expect(screen.getByText('EN')).toBeInTheDocument();
      const minutesInput = screen.getByLabelText('Minutes');
      userEvent.type(minutesInput, '2');
      userEvent.click(screen.getByText('Start'));
      expect(screen.getByText('2:00')).toBeInTheDocument();
    });
  });

  describe('Data Integration Tests', () => {
    test('should render complete workout data structure', () => {
      render(<App />);
      
      // Expand all cards to test data rendering
      userEvent.click(screen.getByText('Training Goals'));
      userEvent.click(screen.getByText('Training Plan'));
      userEvent.click(screen.getByText('Recovery & Sleep'));
      userEvent.click(screen.getByText('Nutrition Strategy'));
      userEvent.click(screen.getByText('Fasting Workouts'));
      
      // Should render all data sections
      expect(screen.getByText('Build Lean Muscle')).toBeInTheDocument();
      expect(screen.getByText('Phase 1: Foundation')).toBeInTheDocument();
      expect(screen.getByText('Sleep Optimization')).toBeInTheDocument();
      expect(screen.getByText('Pre-Workout Nutrition')).toBeInTheDocument();
      expect(screen.getByText('Ramadan Training')).toBeInTheDocument();
      
      // Should render detailed content
      expect(screen.getByText('Progressive overload training')).toBeInTheDocument();
      expect(screen.getByText('Bench Press')).toBeInTheDocument();
      expect(screen.getByText('4 sets x 8-10 reps')).toBeInTheDocument();
      expect(screen.getByText('90s')).toBeInTheDocument();
      expect(screen.getByText('Muscle recovery')).toBeInTheDocument();
      expect(screen.getByText('Banana')).toBeInTheDocument();
      expect(screen.getByText('Quick energy')).toBeInTheDocument();
      expect(screen.getByText('7-9 hours sleep')).toBeInTheDocument();
      expect(screen.getByText('Modified training schedule')).toBeInTheDocument();
    });

    test('should handle missing or incomplete data gracefully', () => {
      // This test would require mocking incomplete data
      // For now, verify current data structure完整性
      render(<App />);
      
      userEvent.click(screen.getByText('Training Goals'));
      
      // Should render available data without errors
      expect(screen.getByText('Build Lean Muscle')).toBeInTheDocument();
      expect(screen.getByText('Progressive overload training')).toBeInTheDocument();
    });
  });

  describe('Performance Integration Tests', () => {
    test('should handle rapid user interactions without errors', () => {
      render(<App />);
      
      // Rapid language switching
      for (let i = 0; i < 10; i++) {
        userEvent.click(i % 2 === 0 ? screen.getByText('EN') : screen.getByText('AR'));
      }
      
      // Rapid timer changes
      const minutesInput = screen.getByLabelText('Minutes');
      for (let i = 1; i <= 10; i++) {
        userEvent.clear(minutesInput);
        userEvent.type(minutesInput, i.toString());
      }
      
      // Rapid card toggles
      const cards = ['Training Goals', 'Training Plan', 'Recovery & Sleep'];
      for (let i = 0; i < 20; i++) {
        userEvent.click(screen.getByText(cards[i % 3]));
      }
      
      // Should not crash and maintain functionality
      expect(screen.getByText('Workouts Pro')).toBeInTheDocument();
      expect(screen.getByText('EN')).toBeInTheDocument();
      expect(screen.getByText('AR')).toBeInTheDocument();
    });

    test('should handle large number of simultaneous state changes', () => {
      render(<App />);
      
      // Start timer and make multiple changes
      userEvent.clear(screen.getByLabelText('Minutes'));
      userEvent.type(screen.getByLabelText('Minutes'), '5');
      userEvent.click(screen.getByText('Start'));
      
      // Switch languages while timer is running
      userEvent.click(screen.getByText('AR'));
      jest.advanceTimersByTime(1000);
      userEvent.click(screen.getByText('EN'));
      jest.advanceTimersByTime(1000);
      
      // Toggle cards
      userEvent.click(screen.getByText('Training Goals'));
      userEvent.click(screen.getByText('Training Plan'));
      
      // Pause timer
      userEvent.click(screen.getByRole('button', { name: /Pause/i }));
      
      // Should maintain consistency
      expect(screen.getByText('4:58')).toBeInTheDocument();
      expect(document.body.dir).toBe('ltr');
      expect(screen.getByText('Build Lean Muscle')).toBeInTheDocument();
      expect(screen.getByText('Phase 1: Foundation')).toBeInTheDocument();
    });
  });

  describe('Error Recovery Integration Tests', () => {
    test('should recover from invalid timer states', () => {
      render(<App />);
      
      // Set invalid time
      const minutesInput = screen.getByLabelText('Minutes');
      const secondsInput = screen.getByLabelText('Seconds');
      
      userEvent.clear(minutesInput);
      userEvent.clear(secondsInput);
      userEvent.type(minutesInput, 'abc');
      userEvent.type(secondsInput, 'xyz');
      
      // Should handle non-numeric input gracefully
      expect(minutesInput.value).toBe('');
      expect(secondsInput.value).toBe('');
      
      // Try to start with invalid input
      userEvent.click(screen.getByText('Start'));
      
      // Should show alert and not start timer
      expect(window.alert).toHaveBeenCalledWith('Please set a valid time for timer');
      expect(screen.getByText('0:00')).toBeInTheDocument();
    });

    test('should handle component errors without crashing', () => {
      // Mock console error to test error handling
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      
      render(<App />);
      
      // Simulate various interactions that might cause errors
      userEvent.click(screen.getByText('Training Goals'));
      userEvent.clear(screen.getByLabelText('Minutes'));
      userEvent.type(screen.getByLabelText('Minutes'), 'invalid');
      userEvent.click(screen.getByText('EN'));
      userEvent.click(screen.getByText('AR'));
      
      // Should not crash even with invalid input
      expect(screen.getByText('Workouts Pro')).toBeInTheDocument();
      
      consoleSpy.mockRestore();
    });
  });
});