import { z, type AnyZodObject } from "zod"

interface ActionBuilder<T extends AnyZodObject, R> {
  input: <Z extends AnyZodObject>(schema: Z) => ActionBuilder<Z, R & z.infer<Z>>

  use: <M extends Record<any, any> | void>(
    middlewareFn: (input: z.infer<T>) => M
  ) => ActionBuilder<T, R & (M extends void ? {} : M)>

  handler: (handler: (input: z.infer<T>) => any) => (input: z.infer<T>) => R
}

const objectsIntersection = <U, O>(
  u: U,
  o: O
): U & O extends infer I ? { [K in keyof I]: I[K] } : never => {
  return { ...u, ...o } as any
}

function actionBuilder<S extends AnyZodObject, R>(
  middleware: ((...args: any[]) => any)[],
  schema?: S
): ActionBuilder<S, R> {
  return {
    input: <Z extends AnyZodObject>(newSchema: Z) =>
      actionBuilder<Z, R & z.infer<Z>>(middleware, newSchema),

    use: <M>(middlewareFn: (input: z.infer<S>) => M) =>
      actionBuilder<S, R & (M extends void ? {} : M)>(
        middleware.concat(middlewareFn),
        schema
      ),

    handler: (handler: (input: z.infer<S>) => any) => {
      return (input: z.infer<S>) => {
        const parsedInput = schema?.parse(input)
        middleware.reduce(
          (prev, curr) => objectsIntersection(prev, curr(prev)),
          parsedInput || input
        )
        return handler(parsedInput || input) as R
      }
    },
  }
}

export const action = actionBuilder([])
