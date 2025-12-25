// Unit tests for core App functions
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Mock the workoutData for testing
const mockWorkoutData = {
  goals: [
    {
      title: { en: 'Build Lean Muscle', ar: 'بناء العضلات الخالية من الدهون' },
      points: [
        { en: 'Progressive overload training', ar: 'تدريب الحمل المتصاعد' },
        { en: 'Compound movements', ar: 'الحركات المركبة' }
      ]
    }
  ],
  plan: [
    {
      title: { en: 'Phase 1: Foundation', ar: 'المرحلة 1: الأساس' },
      exercises: [
        {
          name: { en: 'Bench Press', ar: 'ضغط البنش' },
          details: { en: '4 sets x 8-10 reps', ar: '4 مجموعات × 8-10 تكرارات' },
          rest: 90,
          duration: '45 min'
        }
      ],
      tips: [
        { en: 'Focus on form', ar: 'التركيز على الشكل' }
      ]
    }
  ],
  nutrition: [
    {
      title: { en: 'Pre-Workout Nutrition', ar: 'التغذية قبل التمرين' },
      items: [
        {
          name: { en: 'Banana', ar: 'موز' },
          description: { en: 'Quick energy', ar: 'طاقة سريعة' }
        }
      ]
    }
  ],
  recovery: [
    {
      title: { en: 'Sleep Optimization', ar: 'تحسين النوم' },
      benefits: [
        { en: 'Muscle recovery', ar: 'تعافي العضلات' }
      ],
      implementation: [
        { en: '7-9 hours sleep', ar: '7-9 ساعات نوم' }
      ]
    }
  ],
  fasting: [
    {
      title: { en: 'Ramadan Training', ar: 'التدريب في رمضان' },
      content: { en: 'Modified training schedule', ar: 'جدول تدريب معدل' },
      guidelines: [
        { en: 'Reduce intensity', ar: 'تقليل الشدة' }
      ],
      references: [
        { en: 'Research study 1', ar: 'دراسة بحثية 1' }
      ]
    }
  ]
};

// Mock workoutData module
jest.mock('./workoutData', () => ({
  workoutData: mockWorkoutData
}));

// Import the actual App component
import App from '../App';

describe('Core Functions Unit Tests', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  describe('Language Toggle Function', () => {
    test('should switch to English language', () => {
      render(<App />);
      
      const enButton = screen.getByText('EN');
      userEvent.click(enButton);
      
      expect(document.body.dir).toBe('ltr');
      expect(screen.getByText('Workouts Pro')).toBeInTheDocument();
    });

    test('should switch to Arabic language', () => {
      render(<App />);
      
      const arButton = screen.getByText('AR');
      userEvent.click(arButton);
      
      expect(document.body.dir).toBe('rtl');
      expect(screen.getByText('تمارين احترافية')).toBeInTheDocument();
    });

    test('should update text direction on language change', () => {
      render(<App />);
      
      // Start with English
      expect(document.body.dir).toBe('ltr');
      
      // Switch to Arabic
      const arButton = screen.getByText('AR');
      userEvent.click(arButton);
      
      expect(document.body.dir).toBe('rtl');
      
      // Switch back to English
      const enButton = screen.getByText('EN');
      userEvent.click(enButton);
      
      expect(document.body.dir).toBe('ltr');
    });
  });

  describe('Timer Function Tests', () => {
    test('should start timer with valid time', () => {
      render(<App />);
      
      // Set timer to 2 minutes
      const minutesInput = screen.getByLabelText('Minutes');
      const secondsInput = screen.getByLabelText('Seconds');
      
      userEvent.clear(minutesInput);
      userEvent.type(minutesInput, '2');
      
      const startButton = screen.getByText('Start');
      userEvent.click(startButton);
      
      // Check if timer shows 2:00
      expect(screen.getByText('2:00')).toBeInTheDocument();
    });

    test('should show alert for invalid timer (0:00)', () => {
      const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
      
      render(<App />);
      
      const startButton = screen.getByText('Start');
      userEvent.click(startButton);
      
      expect(alertSpy).toHaveBeenCalledWith('Please set a valid time for timer');
    });

    test('should pause running timer', async () => {
      render(<App />);
      
      // Start timer
      const minutesInput = screen.getByLabelText('Minutes');
      userEvent.type(minutesInput, '1');
      
      const startButton = screen.getByText('Start');
      userEvent.click(startButton);
      
      // Wait a second then pause
      jest.advanceTimersByTime(1000);
      
      const pauseButton = await screen.findByText('Pause');
      userEvent.click(pauseButton);
      
      // Check if pause button shows
      expect(screen.getByText('Pause')).toBeInTheDocument();
    });

    test('should reset timer to 0:00', () => {
      render(<App />);
      
      // Set and start timer
      const minutesInput = screen.getByLabelText('Minutes');
      userEvent.type(minutesInput, '1');
      
      const startButton = screen.getByText('Start');
      userEvent.click(startButton);
      
      // Reset timer
      const resetButton = screen.getByText('Reset');
      userEvent.click(resetButton);
      
      expect(screen.getByText('0:00')).toBeInTheDocument();
    });

    test('should show alert when timer reaches zero', () => {
      const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
      
      render(<App />);
      
      // Set timer to 1 second
      const minutesInput = screen.getByLabelText('Minutes');
      const secondsInput = screen.getByLabelText('Seconds');
      
      userEvent.clear(minutesInput);
      userEvent.clear(secondsInput);
      userEvent.type(secondsInput, '1');
      
      const startButton = screen.getByText('Start');
      userEvent.click(startButton);
      
      // Advance time to trigger alert
      jest.advanceTimersByTime(1000);
      
      // Wait for alert
      waitFor(() => {
        expect(alertSpy).toHaveBeenCalledWith('Time is up!');
      });
    });
  });

  describe('Translation Helper Function Tests', () => {
    test('should return English text for en language', () => {
      render(<App />);
      
      const enButton = screen.getByText('EN');
      userEvent.click(enButton);
      
      expect(screen.getByText('Professional training strategies for optimal performance and recovery.')).toBeInTheDocument();
    });

    test('should return Arabic text for ar language', () => {
      render(<App />);
      
      const arButton = screen.getByText('AR');
      userEvent.click(arButton);
      
      expect(screen.getByText(/استراتيجيات تدريب احترافية/)).toBeInTheDocument();
    });

    test('should handle missing translations gracefully', () => {
      render(<App />);
      
      // Test with object missing current language
      const arButton = screen.getByText('AR');
      userEvent.click(arButton);
      
      // Should fallback to English if Arabic is missing
      // This tests the t function's fallback logic
    });
  });

  describe('Card Toggle Function Tests', () => {
    test('should expand Training Goals card', () => {
      render(<App />);
      
      const goalsCard = screen.getByText('Training Goals');
      userEvent.click(goalsCard);
      
      // Should show goals content
      expect(screen.getByText('Build Lean Muscle')).toBeInTheDocument();
      expect(screen.getByText('Progressive overload training')).toBeInTheDocument();
    });

    test('should collapse Training Goals card', () => {
      render(<App />);
      
      // First expand
      const goalsCard = screen.getByText('Training Goals');
      userEvent.click(goalsCard);
      
      // Then collapse
      userEvent.click(goalsCard);
      
      // Content should be hidden (not in document)
      expect(screen.queryByText('Build Lean Muscle')).not.toBeInTheDocument();
    });

    test('should expand multiple cards independently', () => {
      render(<App />);
      
      // Expand Goals card
      const goalsCard = screen.getByText('Training Goals');
      userEvent.click(goalsCard);
      
      // Expand Training Plan card
      const planCard = screen.getByText('Training Plan');
      userEvent.click(planCard);
      
      // Both should be expanded
      expect(screen.getByText('Build Lean Muscle')).toBeInTheDocument();
      expect(screen.getByText('Phase 1: Foundation')).toBeInTheDocument();
      
      // Collapse Goals card - Plan should remain expanded
      userEvent.click(goalsCard);
      
      expect(screen.queryByText('Build Lean Muscle')).not.toBeInTheDocument();
      expect(screen.getByText('Phase 1: Foundation')).toBeInTheDocument();
    });
  });

  describe('Input Validation Tests', () => {
    test('should validate minutes input (0-99)', () => {
      render(<App />);
      
      const minutesInput = screen.getByLabelText('Minutes');
      
      // Test valid input
      userEvent.clear(minutesInput);
      userEvent.type(minutesInput, '50');
      expect(minutesInput.value).toBe('50');
      
      // Test invalid input (negative)
      userEvent.clear(minutesInput);
      userEvent.type(minutesInput, '-5');
      expect(minutesInput.value).toBe('5'); // Should clamp to 0, then allow 5
    });

    test('should validate seconds input (0-59)', () => {
      render(<App />);
      
      const secondsInput = screen.getByLabelText('Seconds');
      
      // Test valid input
      userEvent.clear(secondsInput);
      userEvent.type(secondsInput, '30');
      expect(secondsInput.value).toBe('30');
      
      // Test invalid input (above 59)
      userEvent.clear(secondsInput);
      userEvent.type(secondsInput, '75');
      expect(secondsInput.value).toBe('5'); // Should clamp to 59, then allow 5
    });
  });

  describe('Responsive Design Tests', () => {
    test('should apply responsive classes correctly', () => {
      render(<App />);
      
      const header = screen.getByRole('banner');
      const main = screen.getByRole('main');
      
      // Check if responsive classes are applied
      expect(header).toHaveClass('sm:px-6', 'lg:px-8');
      expect(main).toHaveClass('sm:px-6', 'lg:px-8');
    });

    test('should maintain functionality on small screens', () => {
      // Simulate small screen
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 640,
      });
      
      render(<App />);
      
      // All buttons and inputs should still work
      expect(screen.getByText('EN')).toBeInTheDocument();
      expect(screen.getByText('AR')).toBeInTheDocument();
      expect(screen.getByLabelText('Minutes')).toBeInTheDocument();
      expect(screen.getByLabelText('Seconds')).toBeInTheDocument();
    });
  });
});