import React from 'react';
import { render } from '@testing-library/react-native';
import LineGraph from '../src/components/LineGraph';

describe('LineGraph component', () => {
  test('renders chart name and progress title correctly', () => {
    const datasets = [
      { data: [10, 20, 30], legend: 'Dataset 1', color: '#ff0000' },
      { data: [15, 25, 35], legend: 'Dataset 2', color: '#00ff00' }
    ];
    const { getByText } = render(
      <LineGraph
        datasets={datasets}
        chartName="Test Chart"
        progressTitle="Progress"
        progress={50}
        labels={['Jan', 'Feb', 'Mar']}
      />
    );
    expect(getByText('Test Chart')).toBeTruthy();
    expect(getByText('Progress')).toBeTruthy();
  });

  test('renders legend items correctly', () => {
    const datasets = [
      { data: [10, 20, 30], legend: 'Dataset 1', color: '#ff0000' },
      { data: [15, 25, 35], legend: 'Dataset 2', color: '#00ff00' }
    ];
    const { getByText } = render(
      <LineGraph
        datasets={datasets}
        chartName="Test Chart"
        progressTitle="Progress"
        progress={50}
        labels={['Jan', 'Feb', 'Mar']}
      />
    );
    expect(getByText('Dataset 1')).toBeTruthy();
    expect(getByText('Dataset 2')).toBeTruthy();
  });

  // You can add more test cases as needed
});
