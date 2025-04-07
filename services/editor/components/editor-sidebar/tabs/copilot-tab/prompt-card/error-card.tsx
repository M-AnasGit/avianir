export default function ErrorPromptCard() {
    return (
        <div className="history-card flex justify-center bg-destructive">
            <small className="font-medium text-destructive-foreground" role="alert">
                Copilot could not generate a response. Please try again later.
            </small>
        </div>
    );
}
