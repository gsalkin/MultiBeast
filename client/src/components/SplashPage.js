import React from 'react';
import {Link} from 'react-router-dom';
class SplashPage extends React.Component {
    state = {
        link: ''
    }
    componentDidMount() {
        const isLoggedIn = sessionStorage.getItem('jwt_token')
        if(!isLoggedIn) {
            this.setState({
                link: '/login'
            })
        } else {
            this.setState({
                link: '/view/all'
            })
        }
    }
	render() {
		return (
			<div className="card bg-dark text-white">
				<img
					src="https://aspenideasfestival.imgix.net/c42dbb12-f28a-4b09-bea6-28c304316957/28454537747_d5b99527d2_o1.jpg?auto=compress%2Cformat&dpr=1&fit=min&fm=jpg&w=1920&q=80"
					class="card-img"
                    alt="Aspen Campus"
				/>
				<div className="card-img-overlay">
					<h1 className="display-1 text-center">MultiBeast</h1>
                    <h2 className='text-center'>2022</h2>
                    <div className="row">
                        <div className="text-center col-4 offset-4">
                            <Link to={this.state.link}>
                                <img src="../../images/MultiBeast_skull.png" className='img-fluid' alt="Enter..."/>
                            </Link>
                        </div>
                    </div>
				</div>
			</div>
		);
	}
}

export default SplashPage;
