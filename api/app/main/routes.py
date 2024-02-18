from flask import jsonify, request, redirect, url_for
import json
from app.main import bp
from app.extensions import db
from app.models.todo import Todo

@bp.route('/todos', methods=["GET"])
def index():
    tl = []
    todos = Todo.query.all()
    for todo in todos:
        td = {'id': todo.id, 'title': todo.title, 'description': todo.description, 'complete': todo.complete}
        tl.append(td)
    return jsonify(tl)


@bp.route("/todo/<int:todo_id>", methods=["GET"])
def get_one(todo_id):
    todo = Todo.query.filter_by(id=todo_id).first()
    td = {'id': todo.id, 'title': todo.title, 'description': todo.description, 'complete': todo.complete}
    return jsonify(td)


@bp.route('/todos', methods=["POST"])
def create():
    content = request.get_json(silent=True)
    todo = Todo(title=content['title'], description=content['description'], complete=content['complete'])
    db.session.add(todo)
    db.session.commit()
    td = {'id': todo.id, 'title': todo.title, 'description': todo.description, 'complete': todo.complete}
    return jsonify(td)


@bp.route("/todo/<int:todo_id>", methods=["PUT"])
def update(todo_id):
    todo = Todo.query.filter_by(id=todo_id).first()
    todo.complete = not todo.complete
    db.session.commit()
    td = {'id': todo.id, 'title': todo.title, 'description': todo.description, 'complete': todo.complete}
    return jsonify(td)

@bp.route("/todo/<int:todo_id>", methods=["DELETE"])
def delete(todo_id):
    todo = Todo.query.filter_by(id=todo_id).first()
    print(todo)
    db.session.delete(todo)
    db.session.commit()
    return jsonify('success')