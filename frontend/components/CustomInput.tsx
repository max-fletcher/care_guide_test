import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form'
import { Field, FieldError, FieldLabel } from './ui/field'
import { Input } from './ui/input'
import { cn } from '@/lib/utils'

// FieldPath<T> is a TypeScript utility type from react-hook-form that resolves to a union of all valid dot-notation path strings for the fields in your form schema T
// For example if your schema is:
// type SignUpFormType = {
//   firstName: string;
//   email: string;
//   password: string;
// }
// Then FieldPath<SignUpFormType> resolves to: "firstName" | "email" | "password"

interface ICustomInputProps<T extends FieldValues> {
  control: Control<T>
  // NOTE: "email" | "password" would work, but we will need to edit it on adding new fields. Hence, we are taking an inference of what this might be from authForm
  name: FieldPath<T>
  label: string
  placeholder: string
  type?: string
  autoComplete?: string
  className?: string
  labelClassName?: string
}

const CustomInput = <T extends FieldValues>({ control, name, label, placeholder, type, autoComplete, className, labelClassName }: ICustomInputProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className={className}>
          <FieldLabel htmlFor={field.name} className={cn('text-base font-medium text-custom-label leading-[1.4]', labelClassName)}>
            {label}
          </FieldLabel>
          <Input
            {...field}
            id={field.name}
            aria-invalid={fieldState.invalid}
            placeholder={placeholder}
            type={type}
            autoComplete={autoComplete}
            className="border-muted focus-visible:border-rest-blue h-12 shadow-none focus-visible:ring-0"
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  )
}

export default CustomInput
