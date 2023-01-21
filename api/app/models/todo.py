from dataclasses import dataclass
from app.extensions import db
import json

@dataclass
class Todo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100))
    description = db.Column(db.String(500))
    complete = db.Column(db.Boolean)

    def __init__(self, title, description, complete):
        self.title = title
        self.description = description
        self.complete = complete

    # def __repr__(self):
    #     return f'<Todo "{self.title}">'
