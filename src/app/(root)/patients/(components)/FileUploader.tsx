"use client";

import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { FileUploaderProps } from "../../../../../types";
import Image from "next/image";
import { convertFileToUrl } from "@/lib/utils";
import { ImageUp } from "lucide-react";

const FileUploader = ({ files, onChange }: FileUploaderProps) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    onChange(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className="file-upload">
      <input {...getInputProps()} />
      {files && files.length > 0 ? (
        <Image
          src={convertFileToUrl(files[0])}
          width={1000}
          height={1000}
          alt="Uploaded Image"
          className="max-h-[400px] overflow-hidden object-cover"
        />
      ) : (
        <>
          <ImageUp className="bg-primary rounded-full h-8 w-8 p-1" />
          <div className="file-upload_label">
            <p className="text-14-regular">
              <span className="text-secondary">
                Click to upload
              </span>{" "}
              or drag and drop
            </p>
            <p>SVG, PNG, JPG (max 800x400)</p>
          </div>
        </>
      )}
    </div>
  );
};

export default FileUploader;
