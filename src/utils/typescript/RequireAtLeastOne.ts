/**
 * Требует присутствия хотя бы одного поля
 *
 * ...ts
 * type Greeter = RequireAtLeastOne<{displayName: string; nickName: string}>;
 *
 * const obj1: Greeter = {};
 *         ^ TypeError - нужно хотя бы одно поле
 * const obj2: Greeter = {displayName: 'Name'};
 *        ^ Валидно
 * const obj3: Greeter = {nickName: 'NickXXX'};
 *       ^ Валидно
 * const obj4: Greeter = {displayName: 'Name', nickName: 'Nick'};
 *       ^ Валидно
 */
export type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<T, Exclude<keyof T, Keys>> &
    {
        [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>;
    }[Keys];
