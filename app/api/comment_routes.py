from flask import Blueprint
from app.models import Comment, db


comment_routes = Blueprint("comment", __name__)



#* Get All Comments for a Video *#
@comment_routes.route('/<int:videoId>')
def video_comments(videoId):
    comments = Comment.query.filter(Comment.video_id == videoId).all()

    return [comment.to_dict() for comment in comments]
