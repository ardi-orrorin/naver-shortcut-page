export type Nullable<T> = T | null;

export type BooleanOrNull = boolean | null;
export type StringOrNull = string | null;

export type NonNullable<T> = T extends null | undefined ? never : T;

export type Undefinable<T> = T | undefined;

export type UndefinableOrNull<T> = T | null | undefined;

export type DeepPartial<T> = T extends object ? { [key in keyof T]?: DeepPartial<T[key]> } : T;

export type DeepNonNullable<T> = T extends object ? { [key in keyof T]: DeepNonNullable<T[key]> } : NonNullable<T>;

export type RequiredNonNull<T> = Required<NonNullable<T>>;
