'use client';
import TutorialVideoButton from './tutorial-video-modal/tutorial-video-button';

export default function FormGuide() {
    return (
        <div className="flex flex-col gap-4">
            <section className="guidelines-section">
                <h6 className="guidelines-title">Form elements</h6>
                <p className="guidelines-content">
                    Form elements are to be used to implement live exercices in your courses.
                    <br />
                    <span className="italic text-muted-foreground">
                        Form elements can only be used inside a form container.
                    </span>
                </p>
                <TutorialVideoButton src={'form_1'} />
            </section>
            <section className="guidelines-section">
                <h6 className="guidelines-title">Default elements in a form</h6>
                <p className="guidelines-content">Default elements can be used inside a form container.</p>
                <TutorialVideoButton src={'form_2'} />
            </section>
        </div>
    );
}
