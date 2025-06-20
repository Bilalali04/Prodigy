const { editTask } = require('../utils/editTaskService');

test('Valid edit should pass', () => {
    expect(editTask('Complete Project', 'Finish the final module', 'vickyluu@gmail.com')).toBe(true);
});

test('Invalid email should fail', () => {
    expect(editTask('Complete Project', 'Finish the final module', 'Vic.gmail.com')).toBe(false);
});

test('Invalid description should fail', () => {
    expect(editTask('Complete Project', '', 'vickyluu@gmail.com')).toBe(false);
});
