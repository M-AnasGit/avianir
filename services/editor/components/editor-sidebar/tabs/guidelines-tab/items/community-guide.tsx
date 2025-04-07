'use client';
import TutorialVideoButton from './tutorial-video-modal/tutorial-video-button';

export default function CommunityGuide() {
    return (
        <div className="flex flex-col gap-4">
            <section className="guidelines-section">
                <h6 className="guidelines-title">Publish presets</h6>
                <p className="guidelines-content">
                    When you publish a preset, it will be available for all users to use.
                    <br />
                    <span className="italic text-muted-foreground">
                        Your media won't be shared but the text content will be available.
                    </span>
                </p>
                <TutorialVideoButton src={'community_publish'} />
            </section>
            <section className="guidelines-section">
                <h6 className="guidelines-title">Import presets</h6>
                <p className="guidelines-content">
                    When you import a preset, if it includes media, it will be replaced with a placeholder.{' '}
                </p>
                <TutorialVideoButton src={'community_import'} />
            </section>
        </div>
    );
}
