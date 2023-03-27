from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    firstName = db.Column(db.String())
    lastName = db.Column(db.String())
    username = db.Column(db.String())
    email = db.Column(db.String())
    profile_img = db.Column(db.String())
    hashed_password = db.Column(db.String())
    created_at = db.Column(db.DateTime)
    updated_at = db.Column(db.DateTime)

    videos = db.relationship('Video', back_populates='user')
    comments = db.relationship('Comment', back_populates='user')



    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'firstName': self.firstName,
            'lastName': self.lastName,
            'username': self.username,
            'email': self.email,
            'profile_img': self.profile_img,
            'password': self.password,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
