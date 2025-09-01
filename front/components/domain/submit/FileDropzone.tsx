"use client";

import React from "react";
import { useDropzone } from "react-dropzone";
import { UploadCloud, FileText, X } from "lucide-react";

interface FileDropzoneProps {
  onFilesDrop: (files: File[]) => void;
  files: File[];
  removeFile: (file: File) => void;
}

export function FileDropzone({ onFilesDrop, files, removeFile }: FileDropzoneProps) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onFilesDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    }
  });

  return (
    <div className="flex flex-col space-y-4">
      <div
        {...getRootProps()}
        className={`flex flex-col items-center justify-center p-6 min-h-[250px] border-2 border-dashed rounded-lg cursor-pointer transition-colors text-center ${isDragActive ? "border-primary bg-primary/10" : "border-border hover:border-primary/50"
          }`}
      >
        <input {...getInputProps()} />
        <UploadCloud className="w-12 h-12 text-muted-foreground" />
        <p className="mt-4 text-muted-foreground">
          상품 기획서, 설명서, 매출 보고서 등 관련 문서를 여기에 드래그하거나 클릭하여 업로드하세요.
        </p>
        <p className="text-sm text-muted-foreground/80 mt-1">(PDF, DOCX 파일만 가능)</p>
      </div>
      {files.length > 0 && (
        <div className="space-y-2">
          <h3 className="font-semibold text-sm">업로드된 파일:</h3>
          <ul className="space-y-1">
            {files.map((file, index) => (
              <li key={index} className="flex items-center justify-between text-sm bg-secondary p-2 rounded-md">
                <div className="flex items-center gap-2 overflow-hidden">
                  <FileText className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">{file.name}</span>
                </div>
                <button
                  type="button"
                  onClick={() => removeFile(file)}
                  className="p-1 rounded-full hover:bg-destructive/20 flex-shrink-0"
                >
                  <X className="w-4 h-4 text-destructive" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

