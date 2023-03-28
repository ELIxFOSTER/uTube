from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import StringField, TextAreaField
from wtforms.validators import DataRequired
from app.api.aws_helpers import ALLOWED_EXTENSIONS

class VideoForm(FlaskForm):
    title = StringField('title', validators=[DataRequired()])
    description = TextAreaField('description', validators=[DataRequired()])
    category = StringField('category', validators=[DataRequired()])
    url = FileField('url', validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
    thumbnail = FileField('thumbnail', validators=[
        FileRequired(),
        FileAllowed(['jpg', 'jpeg', 'png', 'gif'], 'Only image files are allowed!')
    ])
    user_id = StringField('user_id', validators=[DataRequired()])
