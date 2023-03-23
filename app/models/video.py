from .db import db, environment, SCHEMA, add_prefix_for_prod


class Video(db.Model):
    __tablename__ = 'videos'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    title = db.Column(db.String(100))
    description = db.Column(db.String(500))
    category = db.Column(db.String(50))
    url = db.Column(db.String(100))
    thumbnail_img = db.Column(db.String(100))
    created_at = db.Column(db.DateTime)
    updated_at = db.Column(db.DateTime)

    user = db.relationship('User', back_populates='videos')
    comments = db.relationship('Comment', back_populates='video')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'title': self.title,
            'description': self.description,
            'category': self.category,
            'url': self.url,
            'thumbnail_img': self.thumbnail_img,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
