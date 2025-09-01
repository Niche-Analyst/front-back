from fastapi import APIRouter, UploadFile, File, Form
from app.services.s3_service import upload_file_to_s3

router = APIRouter(prefix="/upload", tags=["upload"])

@router.post("/file")
async def upload_file(
    user_id: str = Form(...),
    description: str = Form(...),
    file: UploadFile = File(...)
):
    """
    예시: 사용자 입력과 파일을 받아 S3에 저장 후 URL 반환
    """
    s3_key = f"{user_id}/{file.filename}"
    s3_url = upload_file_to_s3(file, s3_key)
    if s3_url:
        return {"user_id": user_id, "description": description, "file_url": s3_url}
    return {"error": "업로드 실패"}
