"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CategoryAutocomplete } from "@/components/domain/submit/CategoryAutocomplete";
import { FileDropzone } from "@/components/domain/submit/FileDropzone";
import { Toaster, toast } from "sonner";

// 제출 폼의 전체 레이아웃과 상태를 관리하는 컴포넌트입니다.
export function SubmissionForm() {
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [budget, setBudget] = useState("");
  const [requests, setRequests] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleFilesDrop = (acceptedFiles: File[]) => {
    setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
  };

  const removeFile = (fileToRemove: File) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file !== fileToRemove));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    // 유효성 검사
    if (!productName || !category || !budget) {
      toast.error("제품명, 카테고리, 광고 예산은 필수 입력 항목입니다.");
      setIsLoading(false);
      return;
    }

    if (files.length === 0) {
      toast.error("분석을 위한 관련 문서를 1개 이상 업로드해주세요.");
      setIsLoading(false);
      return;
    }

    // 폼 데이터 생성 (API 전송을 위해)
    const formData = {
      productName,
      category,
      budget,
      requests,
      fileNames: files.map((f) => f.name),
    };

    console.log("Submitting Form Data:", formData);
    toast.success("분석 요청이 성공적으로 제출되었습니다!");

    // API 호출 시뮬레이션
    setTimeout(() => {
      setIsLoading(false);
      // 성공 후 폼 초기화
      setProductName('');
      setCategory('');
      setBudget('');
      setRequests('');
      setFiles([]);
    }, 2000);
  };

  return (
    <>
      <Toaster richColors position="top-center" />
      <form
        onSubmit={handleSubmit}
        className="mx-auto max-w-7xl space-y-8"
      >
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            분석 정보 입력
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            제품 정보를 입력하고 관련 파일을 첨부하여 분석을 시작하세요.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          {/* Left Column: Form Inputs */}
          <div className="space-y-6 rounded-lg border bg-card p-8 shadow-sm">
            <h2 className="text-xl font-semibold">제품 정보</h2>
            <div className="space-y-2">
              <Label htmlFor="product-name">제품명</Label>
              <Input
                id="product-name"
                placeholder="예: ORB AI 솔루션"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">제품 카테고리</Label>
              <CategoryAutocomplete value={category} onValueChange={setCategory} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="budget">광고 예산 (KRW)</Label>
              <Input
                id="budget"
                type="number"
                placeholder="예: 10000000"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="requests">추가 요청 사항</Label>
              <Textarea
                id="requests"
                placeholder="분석 시 특별히 더 확인하고 싶은 내용이 있다면 입력해주세요."
                className="min-h-[120px]"
                value={requests}
                onChange={(e) => setRequests(e.target.value)}
              />
            </div>
          </div>

          {/* Right Column: File Upload */}
          <div className="flex flex-col rounded-lg border bg-card p-8 shadow-sm">
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">관련 문서 업로드</h2>
              <FileDropzone
                onFilesDrop={handleFilesDrop}
                files={files}
                removeFile={removeFile}
              />
            </div>
            <Button type="submit" className="mt-auto w-full h-12 text-lg" disabled={isLoading}>
              {isLoading ? "제출 중..." : "분석 요청하기 (500 토큰)"}
            </Button>
          </div>
        </div>
      </form>
    </>
  );
}

