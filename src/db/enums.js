const Enums = {};
module.exports = Enums;

Enums.UserRoles = {
    UNKNOWN: 'unknown',
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

Enums.DishTypes = {
    DRINKS: 'drinks',
    SOUP: 'soup'
};
