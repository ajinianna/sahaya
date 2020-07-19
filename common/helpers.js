var hbs = require('hbs');
// find the selected dropdown-viewing purpouse
hbs.registerHelper('isSelected',
    (key, value) => { return key == value ? 'selected' : ''; }
);
// checkbox
hbs.registerHelper('isChecked',
    (key, value) => { return key == value ? 'checked' : ''; }
);

hbs.registerHelper('isCheckBoxChecked', (key) => key == "on" ? 'checked' : '');

