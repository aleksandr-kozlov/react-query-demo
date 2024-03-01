export type FilterProperties<Source extends object, AllowedType> = Pick<
    Source,
    {[K in keyof Source]: Source[K] extends AllowedType ? K : never}[keyof Source]
>;
