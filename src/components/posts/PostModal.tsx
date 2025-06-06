'use client';

import React from 'react';
import Modal from '@/components/base/Modal';
import PostCard from '@/components/posts/PostCard';
import { Languages } from '@/i18n/config';
import PostHeaderTitle from '@/components/posts/parts/PostHeaderTitle';
import PostDate from '@/components/posts/parts/PostDate';
import PostHeaderIcon from '@/components/posts/parts/PostHeaderIcon';
import { useLocale } from 'use-intl';
import getPost from '@/utils/getPost';

export interface PostModalProps {
    id: string;
}

export default function PostModal(props: PostModalProps) {
    const locale = useLocale() as Languages;
    const post = getPost(String(props.id));

    if (!post) {
        return null;
    }

    return <Modal
        open
        title={ <div
            className="flex justify-between items-center mx-main-spacing post-header-wrapper gap-4"
        >
            <PostHeaderIcon type={ post.type }/>
            <div
                className="pr-2.5 max-w-[calc(100%-32px)] md:max-w-[calc(100%-40px)]"
            >
                <PostHeaderTitle
                    category={ post.category }
                    type={ post.type }
                    lang={ locale }
                />
                <PostDate happenedAt={ post.happenedAt }/>
            </div>
        </div> }
    >
        <PostCard post={ post } lang={ locale } short={ false } fullImage/>
    </Modal>;
}
