import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	return (
		<ul>
			<li>
				<NavLink exact to="/"
				style={{ textDecoration: 'none', color: 'inherit'}}>Home</NavLink>
			</li>
			{isLoaded && (
				<>
				<li>
					<ProfileButton user={sessionUser} />
				</li>
				<li>
					<NavLink to='/create'
					style={{ textDecoration: 'none', color: 'inherit'}}>
						Create
					</NavLink>
				</li>
				</>
			)}
		</ul>
	);
}

export default Navigation;
