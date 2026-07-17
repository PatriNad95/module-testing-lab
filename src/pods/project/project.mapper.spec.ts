import { mapProjectFromApiToVm } from './project.mapper';
import * as apiModel from './api/project.api-model';
import * as viewModel from './project.vm';

describe('./pods/project', () => {
  it('should return empty project when feeding undefined project', () => {
    // Arrange
    const project = undefined;
    const expectedResult = viewModel.createEmptyProject();

    // Act
    const result = mapProjectFromApiToVm(project);

    // Assert
    expect(result).toEqual(expectedResult);
  });

  it('should return empty project when feeding null project', () => {
    // Arrange
    const project = null;
    const expectedResult = viewModel.createEmptyProject();

    // Act
    const result = mapProjectFromApiToVm(project);

    // Assert
    expect(result).toEqual(expectedResult);
  });

  it('should map a project with an empty employee list correctly', () => {
    // Arrange
    const project: apiModel.Project = {
      id: 'project-1',
      name: 'Project 1',
      employees: [],
      isActive: true,
    };

    const expectedResult: viewModel.Project = {
      id: 'project-1',
      name: 'Project 1',
      employees: [],
      isActive: true,
    };

    // Act
    const result = mapProjectFromApiToVm(project);

    // Assert
    expect(result).toEqual(expectedResult);
  });

  it('should map a project and its nested employees list correctly', () => {
    // Arrange
    const project: apiModel.Project = {
      id: 'project-1',
      name: 'Project 1',
      employees: [
        { id: 'emp-1', employeeName: 'John Doe' },
        { id: 'emp-2', employeeName: 'Jane Smith' },
      ],
      isActive: true,
    };

    const expectedResult: viewModel.Project = {
      id: 'project-1',
      name: 'Project 1',
      employees: [
        { id: 'emp-1', employeeName: 'John Doe' },
        { id: 'emp-2', employeeName: 'Jane Smith' },
      ],
      isActive: true,
    };

    // Act
    const result = mapProjectFromApiToVm(project);

    // Assert
    expect(result).toEqual(expectedResult);
  });
});
