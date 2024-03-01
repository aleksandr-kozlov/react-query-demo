import { RequiredWithoutNullable } from '@/utils/typescript/RequiredWithoutNullable';

/**
 * Позволяет сделать определенные поля NonNullable
 *
 * type User = {name: string; phone: string | null; email: string | null};
 *
 * type UserWithPhone = Ensure<User, 'phone'> // {name: string; phone: string; email: string | false};
 *
 */
export type Ensure<T, K extends keyof T> = T & RequiredWithoutNullable<Pick<T, K>>;
