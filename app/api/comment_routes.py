from flask import Blueprint, request
from app.models import Comment, db
from flask_login import login_required, current_user
from app.forms import CommentForm


comment_routes = Blueprint("comment", __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages



#* Get All Comments for a Video *#
@comment_routes.route('/<int:videoId>')
def video_comments(videoId):
    comments = Comment.query.filter(Comment.video_id == videoId).all()

    return [comment.to_dict() for comment in comments]


#* Delete a Comment *#
@comment_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_comment(id):
    comment = Comment.query.get(id)

    if not comment:
        return {"errors": ["Comment not found"]}, 404

    if comment.user_id != current_user.id:
        return {"errors": ["You are not authorized to delete this comment"]}, 403

    db.session.delete(comment)
    db.session.commit()

    return {"message": "Successfully deleted comment"}


#* Post a Comment *#
@comment_routes.route('/', methods=["POST"])
@login_required
def new_comment():
    form = CommentForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        comment = Comment(
            comment_text=form.comment_text.data,
            user_id=current_user.id,
            video_id=form.video_id.data
        )
        db.session.add(comment)
        db.session.commit()
        return comment.to_dict(), 200
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 403


#* Edit a comment *#
@comment_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_comment(id):
    comment = Comment.query.get(id)

    if not comment:
        return {"errors": ["Comment not found"]}, 404

    if comment.user_id != current_user.id:
        return {"errors": ["You are not authorized to edit this comment"]}, 403

    data = request.get_json()
    if not data or not data.get("comment_text"):
        return {"errors": ["Comment text is required"]}, 400

    comment.comment_text = data["comment_text"]
    db.session.commit()

    return comment.to_dict()
