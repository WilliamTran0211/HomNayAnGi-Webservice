const Enums = {};
module.exports = Enums;

Enums.UserRoles = {
    ADMIN: 'admin',
    USER: 'user',
    REVIEWER: 'reviewer'
};

Enums.SecretCodeTypes = {
    GENERAL: 'general',
    RESET_PASSWORD: 'reset_password'
};

Enums.Genders = {
    UNKNOWN: 'unknown',
    MALE: 'male',
    FEMALE: 'female',
    OTHER: 'other'
};

Enums.UserStatuses = {
    ACTIVE: 'active',
    INACTIVE: 'inactive'
};

Enums.RecipeStatuses = {
    APPROVED: 'approved',
    REVIEWING: 'reviewing',
    REJECTED: 'rejected'
};

Enums.DishTypes = {
    STATER: 'stater',
    DRINK: 'drink',
    SOUP: 'soup',
    MAIN_COURSE: 'main_course',
    DESSERT: 'dessert'
};

Enums.Unit = {
    MILIGRAMS: 'miligrams',
    GRAMS: 'grams',
    KILOGRAMS: 'kilograms',
    MILILITERS: 'mililiters',
    LITITERS: 'lititers',
    TEASPOON: 'teaspoon',
    TABLESPOON: 'tablespoon',
    CUP: 'cup'
};
