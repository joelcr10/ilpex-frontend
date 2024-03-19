import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CourseCard from '../src/components/CourseCard';

describe('CourseCard component', () => {
  test('renders course name and duration correctly', () => {
    const { getByText } = render(
      <CourseCard name="Mathematics" duration="2 weeks" status={false} />
    );
    expect(getByText('Mathematics')).toBeTruthy();
    expect(getByText('2 weeks')).toBeTruthy();
  });

  test('renders completed status correctly', () => {
    const { getByText, queryByText } = render(
      <CourseCard name="Mathematics" duration="2 weeks" status={true} />
    );
    expect(getByText('Completed')).toBeTruthy();
    expect(queryByText("done"))
  });

  test('renders incomplete status correctly', () => {
    const { getByText, queryByText } = render(
      <CourseCard name="Mathematics" duration="2 weeks" status={false} />
    );
    expect(getByText('Incomplete')).toBeTruthy();
    expect(queryByText("done"))
  });

  // You can add more test cases as needed
});
