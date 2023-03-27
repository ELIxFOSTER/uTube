from flask import Blueprint, request, jsonify
from app.models import Video, db
from .aws_helpers import upload_file_to_s3, get_unique_filename
from flask_login import current_user, login_required
from app.forms import VideoForm




video_routes = Blueprint("video", __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages



#* Get all Videos *#
@video_routes.route('/')
def get_all_videos():
    all_videos = Video.query.all()
    return [video.to_dict() for video in all_videos]


#* Get Video Details *#
@video_routes.route('/<int:id>')
def get_video_details(id):
    video_details = Video.query.get(id)

    return video_details.to_dict()


#* Get All Current User Videos *#
@video_routes.route('/current')
@login_required
def get_user_videos():
    user_videos = Video.query.filter(Video.user_id == current_user.id)
    return [video.to_dict() for video in user_videos]


#* Video Post Form *#
@video_routes.route('/', methods=['POST'])
@login_required
def create_video():

    form = VideoForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():

        url = form.data['url']

        url.filename = get_unique_filename(url.filename)

        upload = upload_file_to_s3(url)

        if "url" not in upload:
            return { 'errors': 'File failed to upload' }


        video = Video(
            title=form.data['title'],
            description=form.data['description'],
            category=form.data['category'],
            url = upload['url'],
            thumbnail = form.data['thumbnail'],
            user_id = form.data['user_id']
        )

        db.session.add(video)
        db.session.commit()
        return video.to_dict()
    return {'errors': form.errors}, 403


#* Video Delete *#
@video_routes.route('/<int:video_id>', methods=['DELETE'])
@login_required
def delete_video(video_id):
    video = Video.query.get_or_404(video_id)

    if video.user_id != current_user.id:
        return jsonify({ 'errors': ['Permission Denied']}), 403

    db.session.delete(video)
    db.session.commit()

    return jsonify({ 'message': 'Success'})


# @video_routes.route('/<int:video_id>', methods=['PUT'])
# @login_required
# def edit_video(video_id):
#     video = Video.query.get_or_404(video_id)
#     data = request.get_json()

#     if not data:
#         return { 'errors': 'No data provided' }, 400

#     form = VideoForm(data=data)
#     form['csrf_token'].data = request.cookies['csrf_token']

#     if not form.validate():
#         return { 'errors':validation_errors_to_error_messages(form.errors) }, 403

#     video.title = data.get('title', video.title)
#     video.description = data.get('description', video.description)
#     video.category = data.get('category', video.category)
#     video.url = data.get('url', video.url)
#     video.thumbnail = data.get('thumbnail', video.thumbnail)
#     video.user_id = current_user.id

#     db.session.commit()

#     return jsonify({
#         'id': video.id,
#         'title': video.title,
#         'description': video.description,
#         'category': video.category,
#         'url': video.url,
#         'thumbnail': video.thumbnail,
#         'user_id': video.user_id
#     })
# @video_routes.route('/<int:video_id>', methods=['PUT'])
# @login_required
# def edit_video(video_id):
#     video = Video.query.get_or_404(video_id)
#     print('---video---', video.to_dict())
#     data = request.get_json()
#     print('---data---', data)

#     if not data:
#         return { 'errors': 'No data provided' }, 400

#     form = VideoForm(data=data)
#     form['csrf_token'].data = request.cookies['csrf_token']

#     if not form.validate():
#         return { 'errors': validation_errors_to_error_messages(form.errors) }, 403

#     video.title = data.get('title', video.title)
#     video.description = data.get('description', video.description)
#     video.category = data.get('category', video.category)
#     video.url = data.get('url', video.url)
#     video.thumbnail = data.get('thumbnail', video.thumbnail)
#     video.user_id = current_user.id

#     db.session.commit()

#     return jsonify({
#         'id': video.id,
#         'title': video.title,
#         'description': video.description,
#         'category': video.category,
#         'url': video.url,
#         'thumbnail': video.thumbnail,
#         'user_id': video.user_id
#     })

# @video_routes.route('/<int:video_id>', methods=['PUT'])
# @login_required
# def edit_video(video_id):
#     video = Video.query.get_or_404(video_id)
#     print('---video---', video.to_dict())

#     form = VideoForm(request.form)
#     form['csrf_token'].data = request.cookies['csrf_token']

#     if not form.validate():
#         return { 'errors': validation_errors_to_error_messages(form.errors) }, 403

#     video.title = form.data['title']
#     video.description = form.data['description']
#     video.category = form.data['category']
#     video.url = request.files['url'] if 'url' in request.files else video.url
#     video.thumbnail = form.data['thumbnail']
#     video.user_id = current_user.id

#     db.session.commit()

#     return jsonify({
#         'id': video.id,
#         'title': video.title,
#         'description': video.description,
#         'category': video.category,
#         'url': video.url,
#         'thumbnail': video.thumbnail,
#         'user_id': video.user_id
#     })

# @video_routes.route('/<int:video_id>', methods=['PUT'])
# @login_required
# def edit_video(video_id):
#     video = Video.query.get_or_404(video_id)
#     print('---video---', video.to_dict())

#     form = VideoForm(request.form)
#     form['csrf_token'].data = request.cookies['csrf_token']

#     if not form.validate():
#         return { 'errors': validation_errors_to_error_messages(form.errors) }, 403

#     video.title = form.data['title']
#     video.description = form.data['description']
#     video.category = form.data['category']
#     video.thumbnail = form.data['thumbnail']
#     video.user_id = current_user.id

#     if form.url.data:
#         url_filename = get_unique_filename(form.url.data.filename)
#         upload = upload_file_to_s3(form.url.data)

#         if "url" not in upload:
#             return { 'errors': 'File failed to upload' }

#         video.url = upload['url']

#     db.session.commit()

#     return jsonify({
#         'id': video.id,
#         'title': video.title,
#         'description': video.description,
#         'category': video.category,
#         'url': video.url,
#         'thumbnail': video.thumbnail,
#         'user_id': video.user_id
#     })

@video_routes.route('/<int:video_id>', methods=['PUT'])
@login_required
def edit_video(video_id):
    video = Video.query.get_or_404(video_id)
    data = request.get_json()

    if not data:
        return { 'errors': 'No data provided' }, 400

    form = VideoForm(data=data)
    form['csrf_token'].data = request.cookies['csrf_token']

    if not form.validate():
        return { 'errors': validation_errors_to_error_messages(form.errors) }, 403

    video.title = data.get('title', video.title)
    video.description = data.get('description', video.description)
    video.category = data.get('category', video.category)
    video.thumbnail = data.get('thumbnail', video.thumbnail)
    video.user_id = current_user.id

    db.session.commit()

    return jsonify({
        'id': video.id,
        'title': video.title,
        'description': video.description,
        'category': video.category,
        'url': video.url,
        'thumbnail': video.thumbnail,
        'user_id': video.user_id
    })
