from typing import List, Optional

from sqlalchemy.orm import Session

from ..exceptions import ConditionException, NotFoundException

from ..database import engine
from .models import Item
from .schemas import AddItemSchema


def add_item(item: AddItemSchema) -> Optional[Item]:
    with Session(engine) as db:
        if item.price < 100:
            raise ConditionException(detail="Price must be greater or equal than 100")

        db_item: Item = Item(**item.dict())

        db.add(db_item)
        db.commit()
        db.refresh(db_item)

        return db_item

def delete_item(item_id: int) -> Optional[Item]:
    with Session(engine) as db:
        item: Optional[Item] = db.query(Item).filter(Item.id == item_id).first()

        if not item:
            raise NotFoundException("Item not found")

    
        db.delete(item)
        db.commit()

        return item


def get_item(item_id: str) -> Optional[Item]:
    with Session(engine) as db:
        item: Optional[Item] = db.query(
            Item).filter(Item.name == item_id).first()

        if not item:
            raise NotFoundException("Item not found")

        return item


def get_items(offset: int, limit: int) -> List[Item]:
    with Session(engine) as db:
        return db.query(Item).offset(offset).limit(limit).all()


def update_item(name: str, action: str) -> Optional[Item]:
    with Session(engine) as db:
        item = db.query(Item).filter(Item.name == name).first()

        if item:
            if action == "increment":
                item.quantite += 1
            elif action == "decrement":
                if item.quantite > 1:
                    item.quantite -= 1
                elif item.quantite == 1:
                    # Supprimer l'élément si la quantité est égale à 1
                    db.delete(item)
            else:
                raise ConditionException("Action not allowed")
                
            db.commit()
            db.refresh(item)
            return item
        else:
            raise NotFoundException("Item not found")

