'use client'
import { Controller, useForm } from 'react-hook-form'
import { CreatePostSchema, TCreatePost } from '@/lib/schema/createPost.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Field, FieldError, FieldLabel } from './ui/field'
import { cn } from '@/lib/utils'
import { Textarea } from './ui/textarea'
import PenIcon from './icons/Pen'
import PictureIcon from './icons/Picture'
import VideoIcon from './icons/Video'
import CalendarIcon from './icons/Calendar'
import NotepadIcon from './icons/Notepad'
import { Button } from './ui/button'
import PaperPlaneIcon from './icons/PaperPlane'
import { useEffect, useRef } from 'react'
import { useSession } from 'next-auth/react'
import CustomInput from './CustomInput'
import { TPost } from '@/types/posts.types'
import { TNote } from '@/types/notes.types'
import { EContentChangeMode } from '@/types/content.type'

export interface IFeedPostProps {
  label: string
  className?: string
  mode: EContentChangeMode
  editingData: TPost | TNote | null
  handleCreatePost: (title: string, content: string, author: string) => void
  handleUpdatePost: (_id: string, title: string, content: string, author: string) => void
}

const FeedPostFormUploadItems = [
  {
    icon: <VideoIcon classes="mr-2" height={25} />,
    title: 'Video'
  },
  {
    icon: <CalendarIcon classes="mr-2" height={23} />,
    title: 'Event'
  },
  {
    icon: <NotepadIcon classes="mr-2" height={25} />,
    title: 'Articles'
  }
]

const FeedPostForm = ({ label, className, mode, editingData, handleCreatePost, handleUpdatePost }: IFeedPostProps) => {
  const { data: userSession } = useSession()

  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const form = useForm<TCreatePost>({
    resolver: zodResolver(CreatePostSchema),
    defaultValues: {
      title: '',
      content: '',
      author: ''
    }
  })

  useEffect(() => {
    if (mode === EContentChangeMode.UPDATE && editingData) {
      form.reset({ title: editingData.title, content: editingData.content, author: userSession?.user.id })
    } else {
      form.reset({ title: '', content: '', author: userSession?.user.id })
    }
  }, [mode, editingData])

  const onSubmit = async (data: TCreatePost) => {
    if (mode === EContentChangeMode.CREATE) {
      handleCreatePost(data.title, data.content, userSession!.user.id)
    } else {
      handleUpdatePost(editingData!._id, data.title, data.content, userSession!.user.id)
    }

    form.reset()
  }

  return (
    <>
      <div className="grid grid-cols-12">
        <form id="create-post-form" onSubmit={form.handleSubmit(onSubmit)} className="w-full col-span-11">
          <Controller
            name="content"
            control={form.control}
            render={({ field, fieldState }) => (
              <CustomInput
                {...field}
                control={form.control}
                name="title"
                label="Title"
                placeholder="Enter title"
                aria-invalid={fieldState.invalid}
                type="text"
                className="mb-3"
                labelClassName="flex justify-center lg:block"
              />
            )}
          />

          <Controller
            name="content"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className={cn(`relative`, className)}>
                <Textarea
                  {...field}
                  id={field.name}
                  rows={3}
                  aria-invalid={fieldState.invalid}
                  placeholder={''} //Don't touch. Needs to be here else label disappears.
                  className="w-full peer h-26 pl-8 sm:pl-4 border-none shadow-none text-lg! resize-none focus-visible:border-rest-blue focus-visible:ring-0"
                />
                <FieldLabel
                  htmlFor={field.name}
                  className="
                    absolute left-3 top-3 text-md text-muted2 leading-[1.1] transition-all duration-300 pointer-events-none origin-top-left
                    peer-focus:scale-0 peer-focus:opacity-0
                    peer-not-placeholder-shown:scale-0 peer-not-placeholder-shown:opacity-0
                  "
                >
                  {label} ...
                  <PenIcon classes="-ml-2 -mb-1 bg-red" />
                </FieldLabel>
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
        </form>
      </div>
      <div className="w-full flex justify-center items-center">
        <div className="grid grid-cols-12 justify-center items-center w-full rounded bg-[#1890ff0d] mt-2.5 px-4 h-auto pt-3 lg:pt-0">
          <button onClick={() => fileInputRef.current?.click()} className="flex justify-center items-center col-span-3 lg:col-span-2 text-muted2">
            <span>
              <PictureIcon classes="mr-2" height={25} />
            </span>
            <span className="hidden md:block lg:hidden xl:block">Photo</span>
          </button>
          {FeedPostFormUploadItems.map((FeedPostFormUploadItem) => (
            <button key={FeedPostFormUploadItem.title} className="flex justify-center items-center col-span-3 lg:col-span-2 text-muted2">
              <span>{FeedPostFormUploadItem.icon}</span>
              <span className="hidden md:block lg:hidden xl:block">{FeedPostFormUploadItem.title}</span>
            </button>
          ))}
          <span className="col-span-2 lg:col-span-1"></span>
          <Button type="submit" form="create-post-form" className="col-span-12 lg:col-span-3 items-center m-2 lg:max-w-xl xl:h-12 bg-[#377DFF]">
            <PaperPlaneIcon />
            {mode === EContentChangeMode.CREATE ? 'Create' : 'Update'}
          </Button>
        </div>
      </div>
    </>
  )
}

export default FeedPostForm
