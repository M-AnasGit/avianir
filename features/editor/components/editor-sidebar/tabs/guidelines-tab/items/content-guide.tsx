'use client';
import TutorialVideoButton from './tutorial-video-modal/tutorial-video-button';

export default function ContentGuide() {
    return (
        <div className="flex flex-col gap-4">
            <section className="guidelines-section">
                <h6 className="guidelines-title">Adding elements</h6>
                <TutorialVideoButton src={'content_addelement'} />
            </section>
            <section className="guidelines-section">
                <h6 className="guidelines-title">Edit content</h6>
                <TutorialVideoButton src={'content_editelementcontent'} />
            </section>
            <section className="guidelines-section">
                <h6 className="guidelines-title">Add code</h6>
                <TutorialVideoButton src={'content_elementcontentcode'} />
            </section>
            <section className="guidelines-section">
                <h6 className="guidelines-title">Add maths</h6>
                <TutorialVideoButton src={'content_elementcontentmaths'} />
            </section>
            <section className="guidelines-section">
                <h6 className="guidelines-title">Save and use presets</h6>
                <TutorialVideoButton src={'content_presets'} />
            </section>
            <section className="guidelines-section">
                <h6 className="guidelines-title">Upload media</h6>
                <TutorialVideoButton src={'content_mediaupload'} />
            </section>
            <section className="guidelines-section">
                <h6 className="guidelines-title">Use media</h6>
                <TutorialVideoButton src={'content_mediause'} />
            </section>
        </div>
    );
}
