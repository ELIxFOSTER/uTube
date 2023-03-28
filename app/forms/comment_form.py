from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField
from wtforms.validators import DataRequired, Length

class CommentForm(FlaskForm):
    comment_text = StringField('comment', validators=[DataRequired(), Length(max=255)])
    video_id = IntegerField('video id', validators=[DataRequired()])
    submit = SubmitField("Submit")
