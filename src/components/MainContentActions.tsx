import ThemeSwitcher from '@/components/specific/ThemeSwitcher';
import LanguageSwitcher from '@/components/specific/LanguageSwitcher';
import PostsSearch from '@/components/specific/PostsSearch';
import AudioControl from '@/components/specific/AudioControl';
import {
    AudioPlayerProvider,
} from '@/components/providers/AudioPlayerProvider';

export default function MainContentActions() {
    return <div
        className="absolute lg:top-16 lg:right-16 top-8 right-8 z-501"
    >
        <div
            className="flex items-center gap-x-4 flex-col lg:flex-row lg:gap-x-1"
        >
            <PostsSearch/>
            <ThemeSwitcher/>
            <LanguageSwitcher/>
        </div>
        <AudioPlayerProvider>
            <AudioControl/>
        </AudioPlayerProvider>
    </div>;
}
