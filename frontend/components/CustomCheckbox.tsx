import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form'
import { Field, FieldError, FieldLabel } from './ui/field'
import { Checkbox } from './ui/checkbox'
import { cn } from '@/lib/utils'

// FieldPath<T> is a TypeScript utility type from react-hook-form that resolves to a union of all valid dot-notation path strings for the fields in your form schema T
// For example if your schema is:
// type SignUpFormType = {
//   firstName: string;
//   email: string;
//   password: string;
// }
// Then FieldPath<SignUpFormType> resolves to: "firstName" | "email" | "password"

interface ICustomCheckboxProps<T extends FieldValues> {
  control: Control<T>
  name: FieldPath<T>
  label: string
  labelClassName?: string
}

const CustomCheckbox = <T extends FieldValues>({ control, name, label, labelClassName }: ICustomCheckboxProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field orientation="horizontal" data-invalid={fieldState.invalid}>
          <Checkbox
            id={field.name}
            name={name}
            checked={field.value}
            onCheckedChange={field.onChange}
            className="data-checked:bg-rest-blue data-checked:border-rest-blue -mr-1.5"
          />
          <FieldLabel htmlFor={field.name} className={cn('text-base font-medium text-custom-label leading-[1.4]', labelClassName)}>
            {label}
          </FieldLabel>
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  )
}

export default CustomCheckbox
