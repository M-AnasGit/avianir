'use client';
import TutorialVideoButton from './tutorial-video-modal/tutorial-video-button';

export default function CopilotGuide() {
    return (
        <div className="flex flex-col gap-4">
            <section className="guidelines-section">
                <h6 className="guidelines-title">Use copilot</h6>
                <TutorialVideoButton src={'copilot_use'} />
            </section>
            <section className="guidelines-section">
                <h6 className="guidelines-title">Default elements in a form</h6>
                <p className="guidelines-content">
                    Every user has 1,000,000 tokens monthly to generate content for their courses.
                    <br />
                    <span className="italic text-muted-foreground">
                        Your usage progress can be found on the copilot tab.
                    </span>
                </p>
                <TutorialVideoButton src={'form_2'} />
            </section>
        </div>
    );
}
