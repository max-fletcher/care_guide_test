'use client'
import Image from 'next/image'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Field, FieldError } from './ui/field'
import { cn } from '@/lib/utils'
import { CreateCommentSchema, TCreateComment } from '@/lib/schema/createComment.schema'
import { TPost } from '@/types/posts.types'
import { Input } from './ui/input'
import { useSession } from 'next-auth/react'

export interface IFeedCommentProps {
  placeholder: string
  className?: string
  isPending: boolean
  post: TPost
  handleCreateComment: (body: string, postId: string) => void
}

const FeedCommentForm = ({ placeholder, className, isPending, post, handleCreateComment }: IFeedCommentProps) => {
  const { data: userSession } = useSession()

  const form = useForm<TCreateComment>({
    resolver: zodResolver(CreateCommentSchema),
    defaultValues: {
      body: ''
    }
  })

  const onSubmit = async (data: TCreateComment) => {
    console.log('FeedCommentForm onSubmit', data)
    handleCreateComment(data.body, post.id)
    form.reset()
  }

  return (
    <>
      <div>
        <form
          id={`create-comment-form-${post.id}`}
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex justify-center items-center w-full h-15 bg-muted4 rounded-3xl border-transpaent
          "
        >
          <div className="w-10 h-10">
            <Image
              className="min-w-10 mx-3 aspect-square rounded-full"
              src={userSession?.user.avatar ?? `/images/avatars/txt_img.png`}
              width={150}
              height={150}
              alt="Profile avatar"
            />
          </div>
          <Controller
            name="body"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className={cn(`relative`, className)}>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder={placeholder}
                  className="ml-2 w-full peer h-10 pl-8 sm:pl-4 border-none shadow-none text-lg! resize-none focus-visible:outline-none"
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
        </form>
      </div>
      <div>
        {post.comments && post.comments.length > 0 && (
          <div className="">
            {post.comments.map((comment) => (
              <div key={comment.id} className={cn(`flex mt-2`)}>
                <div className="w-10 h-10">
                  <Image
                    className="min-w-10 mx-3 aspect-square rounded-full"
                    src={userSession?.user.avatar ?? `/images/avatars/txt_img.png`}
                    width={150}
                    height={150}
                    alt="Profile avatar"
                  />
                </div>
                <span className="w-full bg-muted4 rounded-2xl p-3 mb-3 ml-7">
                  <h6 className="font-semibold">
                    {comment.user.firstName} {comment.user.lastName}
                  </h6>
                  <p className="text-muted2">{comment.body}</p>
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* <div>
        <Button
          type="submit"
          form={`create-comment-form-${post.id}`}
          disabled={isPending}
          className="col-span-12 lg:col-span-3 items-center m-2 lg:max-w-xl xl:h-12 bg-[#377DFF]"
        >
          Submit
        </Button>
      </div> */}
    </>
  )
}

export default FeedCommentForm
