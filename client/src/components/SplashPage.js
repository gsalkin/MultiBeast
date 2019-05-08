import React from 'react';
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
			<div class="card bg-dark text-white">
				<img
					src="https://aspenideasfestival.imgix.net/c42dbb12-f28a-4b09-bea6-28c304316957/28454537747_d5b99527d2_o1.jpg?auto=compress%2Cformat&dpr=1&fit=min&fm=jpg&w=1920&q=95"
					class="card-img"
				/>
				<div class="card-img-overlay">
					<h1 class="display-1 text-center">MultiBeast</h1>
                    <div className="row">
                        <div className="text-center col-4 offset-4">
                            <a href={this.state.link}>
                                <img src="../../images/MultiBeast_skull.png" alt="MultiBeast Logo" className='img-fluid'/>
                            </a>
                        </div>
                    </div>
				</div>
			</div>
		);
	}
}

export default SplashPage;
