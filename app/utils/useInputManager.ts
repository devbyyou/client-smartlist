/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useDropzone } from 'react-dropzone';
import React, { useCallback, useState } from 'react';

const useInputManager = () => {
  const [preview, setPreview] = useState<string | ArrayBuffer | null | undefined | any>(null);
  const onDrop = useCallback((acceptedFiles: FileList | any) => {
    const file = new FileReader();
    file.onload = () => {
      setPreview(file.result);
    };
    file.readAsDataURL(acceptedFiles[0]);
  }, []);

  const {
    acceptedFiles, getRootProps, getInputProps, isDragActive,
  } = useDropzone({ onDrop });

  const createFormData = () => {
    if (typeof acceptedFiles[0] === 'undefined') return null;

    const formData = new FormData();
    formData.append('file', acceptedFiles[0]);
    formData.append('upload_preset', 'react-uploads-unsigned');
    // formData.append('api_key', import.meta.env.VITE_CLOUDINATY_API_KEY);

    return formData;
  };

  return {
    preview,
    acceptedFiles,
    getRootProps,
    getInputProps,
    isDragActive,
    createFormData,
  };
};

export default useInputManager;
