from flask import Blueprint, jsonify, request
from app.models import Video, User

search_routes = Blueprint('search', __name__)

@search_routes.route('/<query>')
def search(query):
    """
    Search for videos and users by query and returns results in a list of dictionaries
    """
    video_results = Video.query.filter(Video.title.ilike(f'%{query}%')).all()
    user_results = User.query.filter(User.username.ilike(f'%{query}%')).all()

    videos = [{'id': video.id, 'title': video.title, 'thumbnail': video.thumbnail, 'user': video.user.to_dict()} for video in video_results]
    users = [{'id': user.id, 'username': user.username} for user in user_results]

    return jsonify({'videos': videos, 'users': users})
