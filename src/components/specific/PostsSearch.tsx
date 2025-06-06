'use client';

import useOpen from '@/utils/hooks/useOpen';
import Modal from '@/components/base/Modal';
import { useTranslations } from 'next-intl';

export default function PostsSearch() {
    const { open, close, opened } = useOpen();
    const t = useTranslations('PostsSearch');

    return <>
        <div
            className="cursor-pointer lg:p-2 p-1"
            onClick={ open }
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                height="32px"
                viewBox="0 -960 960 960"
                width="32px"
            >
                <path
                    d="M795.43-105.17 529.04-371q-29.43 24.26-69.11 37.94-39.67 13.67-85.32 13.67-112.12 0-189.87-77.83Q107-475.04 107-585q0-109.96 77.83-187.78 77.82-77.83 188.28-77.83 110.46 0 187.78 77.83 77.33 77.82 77.33 187.93 0 43.98-13.15 83.13-13.16 39.15-39.46 73.59L853-162.74l-57.57 57.57ZM373.81-398.61q77.66 0 131.42-54.53Q559-507.67 559-585q0-77.33-53.85-131.86-53.85-54.53-131.34-54.53-78.33 0-132.96 54.53-54.63 54.53-54.63 131.86 0 77.33 54.55 131.86 54.55 54.53 133.04 54.53Z"
                />
            </svg>
        </div>
        <Modal
            open={ opened }
            onClose={ close }
            title={ <div>
                <input
                    autoFocus
                    className="bg-transparent border-0 h-10 font-bold text-4xl focus:outline-hidden placeholder:font-bold placeholder:text-4xl placeholder:opacity-50"
                    type="text"
                    placeholder={ t('search') }
                />
            </div> }
        >
            <div>
                { t('results') }
            </div>
        </Modal>
    </>;
}
