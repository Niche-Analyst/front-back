# backend/app/routers/webhooks.py

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .. import crud, schemas, database

router = APIRouter()


def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/new-user", status_code=201)
def handle_new_user_webhook(payload: dict, db: Session = Depends(get_db)):

    if payload.get("type") != "INSERT" or "record" not in payload:
        raise HTTPException(status_code=400, detail="Invalid payload from Supabase webhook")

    new_user_data = payload["record"]
    supabase_user_id = new_user_data.get("id")
    
    if not supabase_user_id:
        raise HTTPException(status_code=400, detail="Supabase user ID not found in webhook payload")

    db_user = crud.get_user_by_supabase_id(db, supabase_user_id=supabase_user_id)
    if db_user:

        raise HTTPException(status_code=409, detail="User already exists in MariaDB")

    user_to_create = schemas.UserCreate(
        supabase_user_id=supabase_user_id,
        email=new_user_data.get("email"),
        full_name=new_user_data.get("raw_user_meta_data", {}).get("full_name")
    )
    
    crud.create_user(db=db, user=user_to_create)
    
    return {"message": "Webhook received and user created successfully in MariaDB"}