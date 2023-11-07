export class CustomValidationError extends Error {
  private originalError;

  constructor(error: any) {
    super();
    this.originalError = error;
    this.name = error.name;
  }

  private constructResult(issues: any[], name: string) {
    return {
      issues,
      name,
    };
  }

  convertCustomError() {
    if (Array.isArray(this.originalError)) {
      // Handle custom errors
      return this.constructResult(this.originalError, 'Custom');
    }

    return this.originalError; // Return the original error if it's not a custom error
  }

  convertZodError() {
    if (this.originalError.name === 'ZodError') {
      // Handle ZodErrors
      const newIssues = this.originalError.issues.map(
        (issue: { path: any[]; message: any }) => ({
          field: issue.path.join('.'),
          message: issue.message,
        }),
      );
      return this.constructResult(newIssues, 'ZodError');
    }

    return this.originalError; // Return the original error if it's not a ZodError
  }
}
