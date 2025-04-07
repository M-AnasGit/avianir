'use client';
import React from 'react';
import UploadBox from './upload-box';

type UploadContextType = {
    file: File | null;
    fileURL: string | null;
    Component: React.ReactNode;
    handleDeleteFile: () => void;
};

const UploadContext = React.createContext<UploadContextType | undefined>(undefined);

const UploadProvider = ({
    children,
    id,
    fileType,
    MAX_SIZES,
}: {
    children: React.ReactNode;
    id: string;
    fileType: string;
    MAX_SIZES: Record<string, number>;
}) => {
    const [file, setFile] = React.useState<File | null>(null);
    const [fileURL, setFileURL] = React.useState<string | null>(null);
    const [fileError, setFileError] = React.useState<boolean>(false);
    const handleUploadFile = React.useCallback(
        (files: FileList | File[] | null) => {
            if (files && files[0].size <= MAX_SIZES[fileType.split('/')[0]]) {
                setFile(files[0]);

                if (fileURL) {
                    URL.revokeObjectURL(fileURL);
                }

                const url = URL.createObjectURL(files[0]);
                setFileURL(url);
                setFileError(false);
            } else {
                setFileError(true);
            }
        },
        [fileURL, fileType, MAX_SIZES],
    );
    const handleDeleteFile = React.useCallback(() => {
        setFile(null);
        setFileError(false);
    }, []);

    React.useEffect(() => {
        return () => {
            if (fileURL) URL.revokeObjectURL(fileURL);
        };
    }, [fileURL]);

    return (
        <UploadContext.Provider
            value={{
                file,
                fileURL,
                Component: (
                    <UploadBox
                        id={id}
                        fileType={fileType}
                        fileError={fileError}
                        MAX_SIZES={MAX_SIZES}
                        handleUploadFile={handleUploadFile}
                    />
                ),
                handleDeleteFile,
            }}
        >
            {children}
        </UploadContext.Provider>
    );
};

export default UploadProvider;

export const useUpload = () => {
    const context = React.useContext(UploadContext);
    if (!context) {
        throw new Error('useUpload must be used within an UploadProvider');
    }
    return context;
};
