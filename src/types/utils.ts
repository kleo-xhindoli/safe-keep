export type Assign<T, R> = Omit<T, keyof R> & R;
