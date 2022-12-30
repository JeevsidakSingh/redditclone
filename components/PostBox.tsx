import { useSession } from 'next-auth/react'
import React, { useState } from 'react'
import Avatar from './Avatar'
import {PhotoIcon, LinkIcon} from '@heroicons/react/24/outline'
import {useForm} from 'react-hook-form'
import { ADD_POST, ADD_SUBREDDIT } from '../graphql/mutations'
import { useMutation } from '@apollo/client'
import client from '../apollo-client'
import { GET_ALL_POSTS, GET_SUBREDDIT_BY_TOPIC } from '../graphql/queries'
import toast from 'react-hot-toast'
import { useQuery } from '@apollo/client';

type FormData = {
    postTitle: string
    postBody: string
    postImage: string
    subreddit: string
}

type Props = {
    subreddit?: string
}

function PostBox({subreddit}: Props) {
    const {data: session} = useSession()
    const [addPost] = useMutation(ADD_POST, {
        refetchQueries: [GET_ALL_POSTS, 'getPostsList'],
    })
    const [addSubreddit] = useMutation(ADD_SUBREDDIT)
    
    const [imageBoxOpen, setImageBoxOpen] = useState<boolean>(false)
    const {register, setValue, handleSubmit, watch, formState: {errors},} = useForm<FormData>()

    const onSubmit = handleSubmit(async (formData) => {
        console.log(formData)
        const notification = toast.loading('Creating your post ...')

        try {
            // Query for subreddit topic...
            const {
                data: { getSubredditListByTopic },
            } = await client.query({
                    query: GET_SUBREDDIT_BY_TOPIC,
                    variables: {
                    topic: subreddit || formData.subreddit,
                },
            })

            const subredditExists = getSubredditListByTopic.length > 0;

            if (!subredditExists) {
                // Create new subreddit

                console.log('Subreddit is new! -> creating a NEW subreddit')

                const {data: {insertSubreddit: newSubreddit}} = await addSubreddit({
                    variables: {
                        topic: formData.subreddit
                    },
                })

                console.log('Creating post...', formData)
                const image = formData.postImage || ''

                const{data: {insertPosts: newPost}} = await addPost({
                    variables: {
                        body: formData.postBody,
                        image: image,
                        subreddit_id: newSubreddit.id,
                        title: formData.postTitle,
                        username: session?.user?.name,
                    },
                }) 

                console.log('New post added:', newPost)
            } else {
                // Use existing subreddit
                console.log('Using existing subreddit!')
                console.log(getSubredditListByTopic)

                const image = formData.postImage || ''

                const{data: {insertPosts: newPost}} = await addPost({
                    variables: {
                        body: formData.postBody,
                        image: image,
                        subreddit_id: getSubredditListByTopic[0].id,
                        title: formData.postTitle,
                        username: session?.user?.name,

                    }
                }) 

                console.log('New post added:', newPost)
            }

            // After the post has been added!
            setValue('postBody','')
            setValue('postTitle','')
            setValue('postImage','')
            setValue('subreddit','')

            toast.success('New Post Created!', {
                id: notification
            })
        } catch (error) {
            console.log(error)
            toast.error('Whoops Something Went Wrong!', {
                id: notification
            })
        }
    })

    return  (
        <form 
        onSubmit={onSubmit}
        className='sticky top-16 z-40 bg-white border rounded-md border-gray-300 p-2'>
            <div className='flex items-center space-x-3'>
                <Avatar/>
                
                <input 
                {...register('postTitle', {required: true})}
                disabled={!session}
                className='rounded-md flex-1 bg-gray-50 p-2 pl-5 outline outline-none'
                type='text' 
                placeholder={session ? subreddit? `Create a post in r/${subreddit}`: 'Create a post by entering a title': 'Sign in to post'}/>

                <PhotoIcon 
                    onClick={() => setImageBoxOpen(!imageBoxOpen)} 
                    className={`h-6 text-gray-300 cursor-pointer ${imageBoxOpen && 'text-blue-300'}`}
                />
                <LinkIcon className='h-6 text-gray-300'/> 
            </div>

            {!!watch('postTitle') && (
                <div className='flex flex-col py-2'>
                    {/* Body */}
                    <div className='flex items-center px-2'>
                        <p className='min-w-[90px]'>Body:</p>
                        <input 
                            className='m-2 flex-1 bg-blue-50 p-2 outline-none' {...register('postBody')} 
                            type='text' 
                            placeholder='Text (optional)'
                        />
                    </div>
                    {/* SubReddit */}
                    {!subreddit && (
                        <div className='flex items-center px-2'>
                            <p className='min-w-[90px]'>Subreddit:</p>
                            <input
                                className='m-2 flex-1 bg-blue-50 p-2 outline-none' {...register('subreddit', {required: true})} 
                                type='text' 
                                placeholder='i.e. ReactJS'
                            />
                        </div>
                    )}
                    

                    {imageBoxOpen && (
                        <div className='flex items-center px-2'>
                            <p className='min-w-[90px]'>Image URL:</p>
                            <input 
                                className='m-2 flex-1 bg-blue-50 p-2 outline-none' {...register('postImage')} 
                                type='text' 
                                placeholder='Optional...'
                            />
                        </div>
                    )}

                    {/* Errors */}
                    {Object.keys(errors).length > 0 && (
                        <div className='space-y-2 p-2 text-red-500'>
                            {errors.postTitle?.type === 'required' && (
                                <p>- A Post Title is Required</p>
                            )}

                            {errors.subreddit?.type === 'required' && (
                                <p>- A Subreddit is Required</p>
                            )}
                        </div>
                    )}

                    {!!watch('postTitle') &&  ( 
                        <button type='submit' className='w-full rounded-full bg-blue-400 p-2 text-white'>
                            Create a Post
                        </button>
                    )}
                </div>
            )}
        </form>
    )
}

export default PostBox