export type ToArrayStrict<Type> = [Type] extends [unknown] ? Type[] : never;
