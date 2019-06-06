import React from 'react';
import EditableTimebox from '../../components/EditableTimebox.js';
import { render, fireEvent } from '@testing-library/react';
describe('tests for EditableTimebox component', () => {
     const renderComponent = render(<EditableTimebox />);
     expect(true).toBeFalsy();
});