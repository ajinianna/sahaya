var hbs = require('hbs');

hbs.registerHelper('isSelected',
    (key, value) => { return key == value ? 'selected' : ''; }
);

hbs.registerHelper('isChecked',
    (key, value) => { return key == value ? 'checked' : ''; }
);

hbs.registerHelper('isCheckBoxChecked', (key) => key == "on" ? 'checked' : '');

