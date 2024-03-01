import {Ensure} from './Ensure';

export function hasFields<T extends object, K extends keyof T>(entity: T, ...fields: K[]): entity is Ensure<T, K> {
    return !!entity && fields.every((field) => !!entity[field]);
}

export function ensure<T extends object, K extends keyof T>(
    entity: T,
    checkFn: (item: T) => boolean,
): entity is Ensure<T, K> {
    return checkFn(entity);
}
