'use client';
import TutorialVideoButton from './tutorial-video-modal/tutorial-video-button';
import { Eye, Redo2, Undo2 } from 'lucide-react';

export default function NavigationGuide() {
    return (
        <div className="flex flex-col gap-4">
            <section className="guidelines-section">
                <h6 className="guidelines-title">Saving changes</h6>
                <p className="guidelines-content">
                    To save changes, click the <strong>"Save"</strong> button in the top right corner of the editor.
                </p>
            </section>
            <section className="guidelines-section">
                <h6 className="guidelines-title">Undo/Redo</h6>
                <ul className="guidelines-list">
                    <li className="guidelines-list-item">
                        <span className="guidelines-icon" role="img" aria-label="Undo">
                            <Undo2 size={16} />
                        </span>
                        <p>to undo the last change.</p>
                    </li>
                    <li className="guidelines-list-item">
                        <span className="guidelines-icon" role="img" aria-label="Undo">
                            <Redo2 size={16} />
                        </span>
                        <p>to redo the last change.</p>
                    </li>
                </ul>
            </section>
            <TutorialVideoButton src={'navigation_1'} />
            <section className="guidelines-section">
                <h6 className="guidelines-title">Change device</h6>
                <p className="guidelines-content">
                    To change the device view, click on the device icons in the middle of the navigation bar.
                </p>
            </section>
            <section className="guidelines-section">
                <h6 className="guidelines-title">Preview</h6>
                <ul className="guidelines-list">
                    <li className="guidelines-list-item">
                        <span className="guidelines-icon" role="img" aria-label="Undo">
                            <Eye size={16} />
                        </span>
                        <p className="guidelines-content">to preview how your course looks from the user's end.</p>
                    </li>
                </ul>
            </section>
            <TutorialVideoButton src={'navigation_2'} />
        </div>
    );
}
