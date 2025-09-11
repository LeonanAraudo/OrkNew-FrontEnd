import { reactive } from "vue";
import type { ZodType } from "zod";

export function useValidation<T>(schema: ZodType<T>) {
  const errors = reactive<Record<string, string>>({});

  function validate(data: unknown): T | null {
    for (const key in errors) delete errors[key];

    const result = schema.safeParse(data);

    if (result.success) return result.data;

    result.error.issues.forEach(issue => {
      if (issue.path.length > 0) {
        const key = issue.path[0] as string;
        if (!errors[key]) {
          errors[key] = issue.message;
        }
      }
    });

    return null;
  }

  return { errors, validate };
}
