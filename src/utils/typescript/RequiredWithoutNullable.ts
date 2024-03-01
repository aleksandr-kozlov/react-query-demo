/**
 * Убирает из типа nullable поля
 */
export type RequiredWithoutNullable<T> = {
    [P in keyof T]: NonNullable<T[P]>;
};
