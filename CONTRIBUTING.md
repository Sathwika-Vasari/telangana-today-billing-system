# Contributing Guidelines

## Code of Conduct

All contributors are expected to follow our Code of Conduct:
- Be respectful and inclusive
- Focus on constructive criticism
- Help others learn and grow

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/your-username/telangana-today-billing-system.git`
3. Create a branch: `git checkout -b feature/your-feature-name`
4. Set up development environment (see [SETUP.md](SETUP.md))

## Development Workflow

### Making Changes

1. **Create a feature branch**
   ```bash
   git checkout -b feature/add-new-feature
   # or
   git checkout -b fix/fix-bug-description
   ```

2. **Make your changes**
   - Write clean, readable code
   - Follow existing code style
   - Add comments for complex logic
   - Test your changes

3. **Commit your changes**
   ```bash
   git add .
   git commit -m "Brief description of changes"
   ```

4. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

5. **Create a Pull Request**
   - Describe what you changed
   - Reference any related issues
   - Provide test evidence if applicable

## Commit Message Guidelines

```
[Type] Brief description (50 chars or less)

More detailed explanation if needed. Explain what
and why, not how.

Related-to: #issue_number
```

### Types
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation
- `style:` Code style (no logic changes)
- `refactor:` Code refactoring
- `perf:` Performance improvements
- `test:` Test additions or changes
- `chore:` Build, dependencies, tools

### Examples
```
feat: Add payment reconciliation feature

Implemented automatic payment matching
and reconciliation against bank statements.

fixes #123
```

## Code Style

### JavaScript/Node.js
- Use ES6+ syntax
- Use meaningful variable names
- 2 spaces for indentation
- Use `const` by default, `let` if needed
- Avoid `var`

### React/JSX
- Use functional components
- Use hooks instead of class components
- Keep components small and focused
- Use descriptive prop names
- Export default for page components

### Database
- Use snake_case for columns
- Use meaningful, descriptive names
- Add comments for complex queries
- Use parameterized queries for security

### CSS/Tailwind
- Use Tailwind utility classes
- Keep custom CSS minimal
- Use semantic class names
- Follow mobile-first approach

## Testing

### Before Submitting PR
1. Run tests: `npm test`
2. Check for console errors
3. Test manually in browser/Postman
4. Test edge cases
5. Verify no console warnings

### Writing Tests
```javascript
describe('Feature Name', () => {
  it('should do something specific', () => {
    // Arrange
    const input = 'test';
    
    // Act
    const result = functionUnderTest(input);
    
    // Assert
    expect(result).toBe('expected');
  });
});
```

## Documentation

- Update README.md for new features
- Add JSDoc comments for functions
- Document complex algorithms
- Update API docs if endpoints change
- Include examples in comments

```javascript
/**
 * Calculates the billing amount for a campaign
 * @param {number} duration - Campaign duration in days
 * @param {number} dailyRate - Daily rate in rupees
 * @returns {number} Total billing amount
 */
function calculateBillingAmount(duration, dailyRate) {
  return duration * dailyRate;
}
```

## Pull Request Process

1. **Before submitting:**
   - [ ] Code follows style guide
   - [ ] Self-review completed
   - [ ] Comments added for complex logic
   - [ ] Documentation updated
   - [ ] No console errors/warnings
   - [ ] Tests written and passing

2. **PR Description:**
   ```markdown
   ## Description
   Brief description of changes
   
   ## Related Issues
   Fixes #123
   
   ## Type of Change
   - [ ] Bug fix
   - [ ] New feature
   - [ ] Documentation
   - [ ] Other
   
   ## Testing
   How to test the changes
   
   ## Screenshots (if applicable)
   ```

3. **Merge criteria:**
   - At least 1 approval
   - All checks passing
   - No merge conflicts
   - Follows code style guide

## Common Pitfalls

### Security
❌ **Never commit:**
- `.env` files with secrets
- API keys or tokens
- Passwords or credentials
- Private URLs

✅ **Always use:**
- Environment variables for secrets
- `.env.example` as template
- `.gitignore` for sensitive files

### Performance
❌ **Avoid:**
- Unnecessary API calls
- N+1 queries
- Large bundle sizes
- Memory leaks

✅ **Do:**
- Optimize database queries
- Lazy load components
- Cache when appropriate
- Clean up resources

### Testing
❌ **Don't:**
- Skip tests
- Test implementation details
- Write brittle tests

✅ **Do:**
- Test user behavior
- Test error cases
- Keep tests simple
- Mock external dependencies

## Getting Help

- Check existing issues and PRs
- Ask questions in PR comments
- Review similar code
- Check documentation
- Reach out to maintainers

## Review Process

A maintainer will review your PR:
1. Code review
2. Check for style compliance
3. Verify tests pass
4. Check documentation
5. Request changes if needed
6. Approve and merge

## Recognition

Contributors will be:
- Added to contributor list
- Mentioned in release notes
- Recognized for significant contributions

## Questions?

Feel free to open an issue or discussion for:
- Feature requests
- Bug reports
- Questions
- Suggestions

---

Thank you for contributing! 🎉
