// incompleteTraineeCard.test.tsx

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import IncompleteTraineeCard from '../src/components/IncompleteTraineeCard';

const props = {
  trainee_name: 'Simon',
  batch_name: 'ILP 2023-24 B5',
  courses_left: 3,
  total_number_of_courses: 5,
  course_list: ['Course 1', 'Course 2', 'Course 3'],
};

describe('IncompleteTraineeCard', () => {

  test('renders correctly with given props', () => {
    const { getByTestId, getByText } = render(<IncompleteTraineeCard {...props} />);
    expect(getByTestId('profile-picture')).toBeTruthy();
    expect(getByText('Courses Left 3/5')).toBeTruthy();
  });

  test('accordion expands/collapses on press', () => {
    const { getByTestId, getByText } = render(<IncompleteTraineeCard {...props} />);
    const accordionContainer = getByTestId('accordion-container');
    fireEvent.press(accordionContainer);
    expect(getByText('Incomplete Courses')).toBeTruthy();
    fireEvent.press(accordionContainer);
    expect(getByText('Courses Left 3/5')).toBeTruthy();
  });

  test('accordion changes its title based on expansion', () => {
    const { getByTestId, getByText } = render(<IncompleteTraineeCard {...props} />);
    const accordionContainer = getByTestId('accordion-container');
    fireEvent.press(accordionContainer);
    expect(getByText('Courses Left')).toBeTruthy();
    fireEvent.press(accordionContainer);
    expect(getByText('Courses Left')).toBeTruthy();
  });

  test('shows card with correct details', () => {
    const { getByText } = render(<IncompleteTraineeCard {...props} />);
    
    expect(getByText('Simon')).toBeTruthy();
    expect(getByText('ILP 2023-24 B5')).toBeTruthy();
    expect(getByText('Courses Left 3/5')).toBeTruthy();
  });

})